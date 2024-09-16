import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import io from 'socket.io-client';
import Controls from './Controls';
import ModularSynth from './ModularSynth';
import SampleLoader from './SampleLoader';
import TapeEmulation from './TapeEmulation';
import GlitchEffects from './GlitchEffects';
import StepSequencer from './StepSequencer';
import VocoderModule from './VocoderModule';
import VirtualKeyboard from './VirtualKeyboard';

const socket = io('http://localhost:5000');

const GlitchMusic = () => {
  const [synth, setSynth] = useState(null);
  const [player, setPlayer] = useState(null);
  const [tapeEffect, setTapeEffect] = useState(null);
  const [glitchEffect, setGlitchEffect] = useState(null);
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
    // Initialize tape effect
    const tape = new Tone.Warp({
      wet: 0.5,
    });

    // Initialize glitch effect
    const glitch = new Tone.BitCrusher({
      bits: 4,
    });

    setTapeEffect(tape);
    setGlitchEffect(glitch);

    // Initialize synthesizer
    const filter = new Tone.Filter(synthSettings.filterFrequency, 'lowpass', -12);
    const newSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: synthSettings.oscillator,
        count: 3,
        spread: 30,
      },
      envelope: synthSettings.envelope,
    });

    // Function to play a note (used by the sequencer)
  const triggerNote = (note, time, duration) => {
    if (synth) {
      synth.triggerAttackRelease(note, duration, time);
      socket.emit('noteOn', { note });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4">Aphex Twin Music Generator</h1>
      <Controls playNote={playNote} updateSynthSettings={updateSynthSettings} />
      <StepSequencer triggerNote={triggerNote} />
      <ModularSynth />
      <GlitchEffects glitchEffect={glitchEffect} />
      <TapeEmulation tapeEffect={tapeEffect} />
      <SampleLoader loadSample={loadSample} />
    </div>

);

// Initialize synthesizer
const filter = new Tone.Filter(synthSettings.filterFrequency, 'lowpass', -12);
const newSynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: synthSettings.oscillator,
    count: 3,
    spread: 30,
  },
  envelope: synthSettings.envelope,
});

    // Add effects
    const reverb = new Tone.Reverb(synthSettings.reverb);
    const delay = new Tone.FeedbackDelay('8n', synthSettings.delay);

    // Chain effects
    newSynth.chain(filter, reverb, delay, glitch, tape, Tone.Destination);

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

  const loadSample = (buffer) => {
    const newPlayer = new Tone.Player(buffer).toDestination();
    newPlayer.start();
    setPlayer(newPlayer);
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4">Aphex Twin Music Generator</h1>
      <Controls playNote={playNote} updateSynthSettings={updateSynthSettings} />
      <ModularSynth />
      <GlitchEffects glitchEffect={glitchEffect} />
      <TapeEmulation tapeEffect={tapeEffect} />
      <SampleLoader loadSample={loadSample} />
    </div>
  );
};

export default GlitchMusic;
