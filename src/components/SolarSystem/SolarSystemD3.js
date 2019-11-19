const d3 = require('d3');
const { default: forceMagnetic } = require('d3-force-magnetic');
const chroma = require('chroma-js');
const solarSystemJSON = require('./solar-system.json');

let width;
let height;

d3.forceMagnetic = forceMagnetic;

const G = 1.5e-3; // Controls overall simulation speed
const TRAIL_LENGTH = 250; // # simulation samples
const TRAIL_MAX_ALPHA = 0.5; // trail opacity upper limit
const TRAIL_THICKNESS = 0.08; // relative to body's diameter

const bodyDistortion = 2000;
let zoomLevel = 1;
let lockOn;

function zoomedFactory(forceSim) {
  return (newZoomLevel) => {
    const changeRatio = zoomLevel / newZoomLevel;
    zoomLevel = newZoomLevel;
    const sqrtChangeRatio = Math.sqrt(changeRatio);

    // Slow down motion on zoom-in
    forceSim.stop();
    forceSim.force('gravity').strength(forceSim.force('gravity').strength()() * changeRatio);
    forceSim.nodes().forEach((d) => {
      const node = d;
      node.vx *= sqrtChangeRatio;
      node.vy *= sqrtChangeRatio;
    });
    forceSim.restart();
  };
}

function tickedFactory(forceSim, canvas) {
  return function ticked() {
    const TAU = 2 * Math.PI;
    const F = 1e8; // Scale factor, to prevent bug of (scaled) arcs with r<0.002 from disappearing

    const ctx = d3
      .select(canvas)
      .attr('width', width) // Wipe it
      .attr('height', height)
      .node()
      .getContext('2d');

    // 0,0 at canvas center
    ctx.translate(width * 0.3125, height / 2);

    // Apply zoom
    if (zoomLevel) {
      ctx.scale(zoomLevel / F, zoomLevel / F);
    }

    // Lock on body
    if (lockOn) {
      ctx.translate(-lockOn.x * F, -lockOn.y * F);
    }

    const nodes = forceSim.nodes();
    nodes.forEach((node) => {
      const r = node.r * bodyDistortion;
      const color = chroma(node.color);

      ctx.fillStyle = color.css();
      ctx.beginPath();
      ctx.arc(node.x * F, node.y * F, r * F, 0, TAU);
      ctx.fill();

      // Add orbit trails
      const relAlpha = TRAIL_MAX_ALPHA / node.trail.length;
      const trailR = r * TRAIL_THICKNESS * F;
      const rgb = color.rgb().join(',');

      for (let idx = 0, len = node.trail.length; idx < len; idx += 1) {
        const pnt = node.trail[idx];

        ctx.fillStyle = `rgba(${rgb},${(idx + 1) * relAlpha})`;
        ctx.beginPath();
        ctx.arc(pnt[0] * F, pnt[1] * F, trailR, 0, TAU);
        // ctx.fillRect(pnt[0], pnt[1], trailR, trailR); // rects have better performance than arcs
        ctx.fill();
      }

      // Push current coords to trail buffer
      node.trail.push([ node.x, node.y ]);
      if (node.trail.length > TRAIL_LENGTH) node.trail.shift();
    });
  };
}

function parseBodies(au, pxG, bodies, parentMass = 0, posOffset = [ 0, 0 ], velocityOffset = [ 0, 0 ]) {
  return [].concat(
    ...bodies.map((body) => {
      // Random init angle if not specified
      // (to prevent aligned init forces from distorting orbits)
      const ang = ((body.phase || Math.random() * 360) * Math.PI) / 180;
      const x = posOffset[0] + au(body.distance) * Math.sin(ang);
      const y = posOffset[1] - au(body.distance) * Math.cos(ang);
      const relVelocity = (
        body.distance ? Math.sqrt((pxG * parentMass) / au(body.distance)) : 0
      ) * (body.factorV || 1); // orbital velocity: sqrt(GM/d)
      const vx = velocityOffset[0] + relVelocity * Math.cos(ang);
      const vy = velocityOffset[1] + relVelocity * Math.sin(ang);

      return [
        {
          name: body.name,
          symbol: body.symbol || null,
          color: body.color || 'darkgrey',
          r: au(body.r || Math.cbrt(body.mass)),
          mass: body.mass, // mass in solar masses
          x, // radius, distance & velocity in AUs
          y,
          vx,
          vy,
          trail: [], // Store previous positions
        },
        ...parseBodies(au, pxG, body.satellites || [], body.mass, [ x, y ], [ vx, vy ]),
      ];
    }),
  );
}

function load(forceSim, au, zoomed, bodies) {
  const maxDistance = d3.max(
    bodies.map(d => d3.max(d.satellites.map(s => d.distance + s.distance))),
  );
  au.domain([ 0, maxDistance * 2.1 ]);
  zoomed(1); // Display scale

  const pxG = G * Math.pow(au(1), 3); // in cube of AUs
  const parsedBodies = parseBodies(au, pxG, bodies);
  forceSim
    .nodes(parsedBodies)
    .force('gravity')
    .strength(pxG);
}

export function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
}

export function initSolarSystem(canvas) {
  resize();
  const au = d3.scaleLinear().range([ 0, width ]);
  const forceSim = d3
    .forceSimulation()
    .alphaDecay(0)
    .velocityDecay(0)
    .force(
      'gravity',
      d3
        .forceMagnetic()
        .id(d => d.id)
        .charge(node => node.mass),
    );
  forceSim.on('tick', tickedFactory(forceSim, canvas));
  const zoomed = zoomedFactory(forceSim);

  d3.select(canvas)
    .attr('width', width)
    .attr('height', height)
    .call(
      d3
        .zoom()
        .scaleExtent([ 1, 1e6 ])
        .on('zoom', () => zoomed(d3.event.transform.k)),
    );

  load(forceSim, au, zoomed, solarSystemJSON);

  return canvas;
}
