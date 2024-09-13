import React from 'react';

const Controls = ({ playNote, updateSynthSettings }) => {
  const notes = ['C4', 'D#4', 'F#4', 'A4'];

  const handleOscillatorChange = (event) => {
    updateSynthSettings({ oscillator: event.target.value });
  };

  const handleFilterChange = (event) => {
    updateSynthSettings({ filterFrequency: parseFloat(event.target.value) });
  };

  const handleResonanceChange = (event) => {
    updateSynthSettings({ filterResonance: parseFloat(event.target.value) });
  };

  const handleEnvelopeChange = (event) => {
    const { name, value } = event.target;
    updateSynthSettings({
      envelope: { [name]: parseFloat(value) },
    });
  };

  const handleEffectChange = (event) => {
    const { name, value } = event.target;
    updateSynthSettings({ [name]: parseFloat(value) });
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {notes.map((note) => (
          <button
            key={note}
            onClick={() => playNote(note)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {note}
          </button>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-2xl mb-2">Synthesis Controls</h2>

        {/* Oscillator Type */}
        <div className="mb-2">
          <label className="block">Oscillator Type</label>
          <select onChange={handleOscillatorChange} className="text-black">
            <option value="fatsawtooth">Fat Sawtooth</option>
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>

        {/* Filter Frequency */}
        <div className="mb-2">
          <label className="block">Filter Frequency ({` ${parseFloat(updateSynthSettings.filterFrequency).toFixed(0)} Hz`})</label>
          <input
            type="range"
            min="20"
            max="20000"
            step="1"
            defaultValue="350"
            onChange={handleFilterChange}
            className="w-full"
          />
        </div>

        {/* Resonance */}
        <div className="mb-2">
          <label className="block">Filter Resonance ({`Q: ${parseFloat(updateSynthSettings.filterResonance).toFixed(2)}`})</label>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            defaultValue="1"
            onChange={handleResonanceChange}
            className="w-full"
          />
        </div>

        {/* Envelope Controls */}
        <div className="mb-2">
          <label className="block">Envelope</label>
          <div className="grid grid-cols-4 gap-2">
            {['attack', 'decay', 'sustain', 'release'].map((param) => (
              <div key={param}>
                <label className="block capitalize">{param}</label>
                <input
                  type="range"
                  name={param}
                  min="0.001"
                  max="2"
                  step="0.001"
                  defaultValue="0.5"
                  onChange={handleEnvelopeChange}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Effects */}
        <div className="mb-2">
          <label className="block">Reverb ({` ${parseFloat(updateSynthSettings.reverb).toFixed(1)} s`})</label>
          <input
            type="range"
            name="reverb"
            min="0"
            max="10"
            step="0.1"
            defaultValue="3"
            onChange={handleEffectChange}
            className="w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Delay ({` ${parseFloat(updateSynthSettings.delay).toFixed(2)} s`})</label>
          <input
            type="range"
            name="delay"
            min="0"
            max="1"
            step="0.01"
            defaultValue="0.5"
            onChange={handleEffectChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;
