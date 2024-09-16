import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

const GlitchEffects = ({ glitchEffect, setGlitchEffect }) => {
  const [stutterRate, setStutterRate] = useState(4);
  const [reverse, setReverse] = useState(false);
  const [grainSize, setGrainSize] = useState(0.2);
  const [overlap, setOverlap] = useState(0.1);

  useEffect(() => {
    if (glitchEffect) {
      glitchEffect.stutterRate = stutterRate;
      glitchEffect.reverse = reverse;
      glitchEffect.grainSize = grainSize;
      glitchEffect.overlap = overlap;
    }
  }, [stutterRate, reverse, grainSize, overlap, glitchEffect]);

  return (
    <div className="bg-gray-800 p-4 rounded mt-4">
      <h2 className="text-2xl mb-2">Glitch Effects</h2>

      <div className="mb-2">
        <label className="block">Stutter Rate ({stutterRate} Hz)</label>
        <input
          type="range"
          min="1"
          max="16"
          step="1"
          value={stutterRate}
          onChange={(e) => setStutterRate(parseInt(e.target.value, 10))}
          className="w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Reverse Playback</label>
        <input
          type="checkbox"
          checked={reverse}
          onChange={(e) => setReverse(e.target.checked)}
        />
      </div>

      <div className="mb-2">
        <label className="block">Grain Size ({grainSize} s)</label>
        <input
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          value={grainSize}
          onChange={(e) => setGrainSize(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Overlap ({overlap} s)</label>
        <input
          type="range"
          min="0"
          max="0.5"
          step="0.01"
          value={overlap}
          onChange={(e) => setOverlap(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default GlitchEffects;
