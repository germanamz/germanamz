import './GradientButton.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export function GradientButton({ label, to }) {
  return (
    <Link to={to}>
      <div className="gradient-button">
        <div className="content">
          <span>{label}</span>
        </div>
      </div>
    </Link>
  );
}
