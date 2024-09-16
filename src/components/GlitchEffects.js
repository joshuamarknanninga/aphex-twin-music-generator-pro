import React from 'react';

const GlitchEffects = ({ glitchEffect }) => {
  const handleBitChange = (event) => {
    glitchEffect.bits = parseInt(event.target.value, 10);
  };

  return (
    <div className="bg-gray-800 p-4 rounded mt-4">
      <h2 className="text-2xl mb-2">Glitch Effects</h2>
      <div className="mb-2">
        <label className="block">Bitcrusher Bits ({glitchEffect.bits})</label>
        <input
          type="range"
          min="1"
          max="16"
          step="1"
          defaultValue={glitchEffect.bits}
          onChange={handleBitChange}
          className="w-full"
        />
      </div>
      {/* Add more glitch controls as needed */}
    </div>
  );
};

export default GlitchEffects;
