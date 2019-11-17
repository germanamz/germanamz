import React, { useEffect } from 'react';
import SolarSystemStyles from './SolarSystem.scss';

const { initSolarSystem } = require('./SolarSystemD3');

export function SolarSystem() {
  let canvas;
  useEffect(() => { initSolarSystem(canvas); });
  return (
    <canvas className={SolarSystemStyles.solarSystem} ref={(cnv) => { canvas = cnv; }} />
  );
}
