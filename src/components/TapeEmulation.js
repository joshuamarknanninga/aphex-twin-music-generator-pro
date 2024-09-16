import React from 'react';

const TapeEmulation = ({ tapeEffect }) => {
  const handleWetChange = (event) => {
    tapeEffect.wet.value = parseFloat(event.target.value);
  };

  return (
    <div className="bg-gray-800 p-4 rounded mt-4">
      <h2 className="text-2xl mb-2">Cassette Tape Emulation</h2>
      <div className="mb-2">
        <label className="block">Tape Effect Intensity ({(tapeEffect.wet.value * 100).toFixed(0)}%)</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue={tapeEffect.wet.value}
          onChange={handleWetChange}
          className="w-full"
        />
      </div>
      {/* Add more tape effect controls as needed */}
    </div>
  );
};

export default TapeEmulation;
