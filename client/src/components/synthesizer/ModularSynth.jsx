// src/components/Synthesizer/ModularSynth.jsx
import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { Button, Slider } from 'semantic-ui-react';

const ModularSynth = () => {
  const [oscillatorType, setOscillatorType] = useState('sine');
  const [frequency, setFrequency] = useState(440);
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    const newSynth = new Tone.Synth().toDestination();
    setSynth(newSynth);

    return () => {
      newSynth.dispose();
    };
  }, []);

  const handlePlay = () => {
    if (synth) {
      synth.triggerAttack(frequency);
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (synth) {
      synth.triggerRelease();
      setIsPlaying(false);
    }
  };

  const handleTypeChange = (type) => {
    setOscillatorType(type);
    if (synth) {
      synth.oscillator.type = type;
    }
  };

  const handleFrequencyChange = (e, { value }) => {
    setFrequency(value);
    if (synth) {
      synth.frequency.value = value;
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white">
      <h2 className="text-xl mb-4">Modular Synthesizer</h2>
      <div className="mb-4">
        <label>Oscillator Type:</label>
        <div className="flex space-x-2 mt-2">
          {['sine', 'square', 'sawtooth', 'triangle'].map((type) => (
            <Button
              key={type}
              active={oscillatorType === type}
              onClick={() => handleTypeChange(type)}
              size="small"
              color="blue"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label>Frequency: {frequency} Hz</label>
        <Slider
          min={100}
          max={1000}
          value={frequency}
          onChange={handleFrequencyChange}
        />
      </div>
      <div>
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
