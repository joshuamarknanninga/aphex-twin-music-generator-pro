import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import WaveSurfer from 'wavesurfer.js';

const SampleLoader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [player, setPlayer] = useState(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [detune, setDetune] = useState(0);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#6ba4ff',
        progressColor: '#2d6cdf',
        responsive: true,
      });
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;

      // Load sample into Tone.Player
      const newPlayer = new Tone.Player(arrayBuffer).toDestination();
      setPlayer(newPlayer);

      // Load sample into WaveSurfer
      wavesurfer.current.loadBlob(new Blob([arrayBuffer]));
    };
    reader.readAsArrayBuffer(file);
  };

  const handlePlay = () => {
    if (player) {
      player.playbackRate = playbackRate;
      player.detune = detune;
      player.start();
    }
  };

  const handleStop = () => {
    if (player) {
      player.stop();
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded mt-4">
      <h2 className="text-2xl mb-2">Advanced Sample Manipulation</h2>
      <input type="file" accept="audio/*" onChange={handleFileChange} className="mb-2" />
      <div ref={waveformRef} className="mb-2"></div>

      <div className="mb-2">
        <label className="block">Playback Rate ({playbackRate.toFixed(2)})</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.01"
          value={playbackRate}
          onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Detune ({detune} cents)</label>
        <input
          type="range"
          min="-1200"
          max="1200"
          step="1"
          value={detune}
          onChange={(e) => setDetune(parseInt(e.target.value, 10))}
          className="w-full"
        />
      </div>

      <button
        onClick={handlePlay}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Play Sample
      </button>
      <button
        onClick={handleStop}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Stop Sample
      </button>
    </div>
  );
};

export default SampleLoader;
