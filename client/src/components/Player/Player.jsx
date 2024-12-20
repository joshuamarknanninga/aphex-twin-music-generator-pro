// src/components/Player/Player.jsx
import React, { useContext, useState } from 'react';
import { Button, Slider, Header } from 'semantic-ui-react';
import { SynthContext } from '../../contexts/SynthContext';
import * as Tone from 'tone';

const Player = () => {
  const { synth } = useContext(SynthContext);
  const [volume, setVolume] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    await Tone.start();
    synth.triggerAttack('C4');
    setIsPlaying(true);
  };

  const handleStop = () => {
    synth.triggerRelease();
    setIsPlaying(false);
  };

  const handleVolumeChange = (e, { value }) => {
    setVolume(value);
    Tone.Destination.volume.value = value;
  };

  return (
    <div className="p-4 bg-gray-800 text-white">
      <Header as="h3">Player</Header>
      <div className="mb-4">
        <label>Volume: {volume}</label>
        <Slider
          min={-60}
          max={0}
          value={volume}
          onChange={handleVolumeChange}
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

export default Player;
