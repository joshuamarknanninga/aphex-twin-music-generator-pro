// src/components/Synthesizer/ModularSynth.jsx
import React, { useEffect, useContext } from 'react';
import * as Tone from 'tone';
import Controls from './Controls';
import { SynthContext } from '../../contexts/SynthContext';
import { Button } from 'semantic-ui-react';

const ModularSynth = () => {
  const { synth, setSynth, isPlaying, setIsPlaying } = useContext(SynthContext);

  useEffect(() => {
    const newSynth = new Tone.Synth().toDestination();
    setSynth(newSynth);

    return () => {
      newSynth.dispose();
    };
  }, [setSynth]);

  const handlePlay = async () => {
    await Tone.start(); // Necessary to start audio context on user interaction
    if (synth) {
      synth.triggerAttack('C4');
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (synth) {
      synth.triggerRelease();
      setIsPlaying(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white">
      <h2 className="text-xl mb-4">Modular Synthesizer</h2>
      <Controls />
      <div className="mt-4">
        {!isPlaying ? (
          <Button onClick={handlePlay} color="green">
            Play
          </Button>
        ) : (
          <Button onClick={handleStop} color="red">
            Stop
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModularSynth;
