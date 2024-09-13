import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import io from 'socket.io-client';
import Controls from './Controls';

const socket = io('http://localhost:5000');

const GlitchMusic = () => {
  const [synth, setSynth] = useState(null);
  const [synthSettings, setSynthSettings] = useState({
    oscillator: 'fatsawtooth',
    filterFrequency: 350,
    filterResonance: 1,
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.5,
      release: 1,
    },
    reverb: 3,
    delay: 0.5,
  });

  useEffect(() => {
    // Initialize synthesizer with Korg-like sound
    const filter = new Tone.Filter(synthSettings.filterFrequency, 'lowpass', -12).toDestination();

    const newSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: synthSettings.oscillator,
        count: 3,
        spread: 30,
      },
      envelope: synthSettings.envelope,
    }).connect(filter);

    // Add effects
    const reverb = new Tone.Reverb(synthSettings.reverb).toDestination();
    const delay = new Tone.FeedbackDelay('8n', synthSettings.delay).toDestination();
    newSynth.connect(reverb);
    newSynth.connect(delay);

    setSynth(newSynth);

    // Socket.IO event listeners
    socket.on('noteOn', (data) => {
      newSynth.triggerAttackRelease(data.note, '8n');
    });

    // Clean up
    return () => {
      newSynth.dispose();
      socket.off('noteOn');
    };
  }, [synthSettings]);

  const playNote = (note) => {
    if (synth) {
      synth.triggerAttackRelease(note, '8n');
      socket.emit('noteOn', { note });
    }
  };

  const updateSynthSettings = (newSettings) => {
    setSynthSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4">Aphex Twin Music Generator</h1>
      <Controls playNote={playNote} updateSynthSettings={updateSynthSettings} />
    </div>
  );
};

export default GlitchMusic;
