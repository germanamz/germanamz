import React, { useEffect } from 'react';
import './SolarSystem.scss';

const { initSolarSystem, resize } = require('./SolarSystemD3');

export function SolarSystem() {
  let canvas;
  window.addEventListener('resize', () => canvas && resize());
  useEffect(() => { initSolarSystem(canvas); });
  return (
    <div className="solar-system">
      <canvas ref={(cnv) => { canvas = cnv; }} />
    </div>
  );
}
