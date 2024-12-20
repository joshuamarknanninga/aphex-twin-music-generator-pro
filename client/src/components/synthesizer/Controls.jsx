// src/components/Synthesizer/Controls.jsx
import React, { useState, useEffect } from 'react';
import { Slider } from 'semantic-ui-react';

const Controls = ({ synth }) => {
  const [oscillatorType, setOscillatorType] = useState('sine');
  const [frequency, setFrequency] = useState(440);

  useEffect(() => {
    if (synth) {
      synth.oscillator.type = oscillatorType;
      synth.frequency.value = frequency;
    }
  }, [oscillatorType, frequency, synth]);

  return (
    <div>
      <div className="mb-4">
        <label>Oscillator Type:</label>
        <div className="flex space-x-2 mt-2">
          {['sine', 'square', 'sawtooth', 'triangle'].map((type) => (
            <button
              key={type}
              onClick={() => setOscillatorType(type)}
              className={`px-3 py-1 rounded ${
                oscillatorType === type ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label>Frequency: {frequency} Hz</label>
        <Slider
          min={100}
          max={1000}
          value={frequency}
          onChange={(e, { value }) => setFrequency(value)}
        />
      </div>
    </div>
  );
};

export default Controls;
