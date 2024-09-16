import React, { useState } from 'react';
import * as Tone from 'tone';

const VocoderModule = ({ handleAudioInput, vocoder }) => {
  const [isMicOpen, setIsMicOpen] = useState(false);
  const [harmonicity, setHarmonicity] = useState(3);
  const [Q, setQ] = useState(1);
  const [baseFrequency, setBaseFrequency] = useState(200);

  const toggleMic = async () => {
    if (!isMicOpen) {
      await handleAudioInput();
      setIsMicOpen(true);
    } else {
      // Logic to stop microphone
      setIsMicOpen(false);
    }
  };

  const handleHarmonicityChange = (e) => {
    const value = parseFloat(e.target.value);
    setHarmonicity(value);
    vocoder.harmonicity = value;
  };

  const handleQChange = (e) => {
    const value = parseFloat(e.target.value);
    setQ(value);
    vocoder.Q = value;
  };

  const handleBaseFrequencyChange = (e) => {
    const value = parseFloat(e.target.value);
    setBaseFrequency(value);
    vocoder.baseFrequency = value;
  };

  return (
    <div className="bg-gray-800 p-4 rounded mt-4">
      <h2 className="text-2xl mb-2">Vocoder</h2>
      <button
        onClick={toggleMic}
        className={`${
          isMicOpen ? 'bg-red-500' : 'bg-green-500'
        } hover:bg-opacity-75 text-white font-bold py-2 px-4 rounded`}
      >
        {isMicOpen ? 'Stop Microphone' : 'Start Microphone'}
      </button>

      <div className="mt-4">
        <label className="block">Harmonicity ({harmonicity})</label>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={harmonicity}
          onChange={handleHarmonicityChange}
          className="w-full"
        />
      </div>

      <div className="mt-4">
        <label className="block">Q ({Q})</label>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={Q}
          onChange={handleQChange}
          className="w-full"
        />
      </div>

      <div className="mt-4">
        <label className="block">Base Frequency ({baseFrequency} Hz)</label>
        <input
          type="range"
          min="50"
          max="1000"
          step="1"
          value={baseFrequency}
          onChange={handleBaseFrequencyChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default VocoderModule;
