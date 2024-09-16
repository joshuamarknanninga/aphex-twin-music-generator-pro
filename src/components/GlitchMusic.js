import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import io from 'socket.io-client';
import Controls from './Controls';
import VirtualKeyboard from './VirtualKeyboard';
import VocoderModule from './VocoderModule';
import StepSequencer from './StepSequencer';
import ModularSynthInterface from './ModularSynthInterface';
import GlitchEffects from './GlitchEffects';
import TapeEmulation from './TapeEmulation';
import SampleLoader from './SampleLoader';
import Settings from './Settings';
import { defaultKeyBindings, KeyBindingsContext } from '../utils/KeyBindings';

const socket = io('http://localhost:5000');

const GlitchMusic = () => {
  const [synth, setSynth] = useState(null);
  const [player, setPlayer] = useState(null);
  const [tapeEffect, setTapeEffect] = useState(null);
  const [glitchEffect, setGlitchEffect] = useState(null);
  const [synthSettings, setSynthSettings] = useState({
  const { keyBindings } = useContext(KeyBindingsContext);
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
    const keyToNote = {
      'a': 'C4',
      's': 'D4',
      'd': 'E4',
      'f': 'F4',
      'g': 'G4',
      'h': 'A4',
      'j': 'B4',
      'k': 'C5',
      'l': 'D5'
    };

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (keyBindings.notes[key]) {
        playNoteKeyboard(keyBindings.notes[key]);
      } else if (keyBindings.controls[key]) {
        // Map action names to functions
        switch (keyBindings.controls[key]) {
          case 'increaseFilterFrequency':
            increaseFilterFrequency();
            break;
          case 'decreaseFilterFrequency':
            decreaseFilterFrequency();
            break;
          // Add more cases as needed
          default:
            break;
        }
      }

  const playNoteKeyboard = (note) => {
    if (synth) {
      synth.triggerAttackRelease(note, '8n');
      socket.emit('noteOn', { note });
      // Optionally, provide visual feedback on the virtual keyboard
    }
  };

  const [keyBindings, setKeyBindings] = useState(defaultKeyBindings);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (keyBindings.notes[key]) {
        playNoteKeyboard(keyBindings.notes[key]);
      } else if (keyBindings.controls[key]) {
        keyBindings.controls[key](); // Execute the control function
      } else if (keyBindings.sequencer[key]) {
        keyBindings.sequencer[key]();
      }
      // Add additional key handling as needed
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [synth, keyBindings]);

  const playNoteKeyboard = (note) => {
    if (synth) {
      synth.triggerAttackRelease(note, '8n');
      socket.emit('noteOn', { note });
      // Optionally, provide visual feedback on the virtual keyboard
    }
  };

  // Example control functions
  const increaseFilterFrequency = () => {
    setSynthSettings((prev) => ({
      ...prev,
      filterFrequency: Math.min(prev.filterFrequency + 50, 20000),
    }));
  };

  const decreaseFilterFrequency = () => {
    setSynthSettings((prev) => ({
      ...prev,
      filterFrequency: Math.max(prev.filterFrequency - 50, 20),
    }));
  };

  useEffect(() => {
    // Initialize tape effect
    const tape = new Tone.Warp({
      wet: 0.5,
    });

    // Initialize glitch effects
    const stutter = new Tone.Tremolo(stutterRate, 0.7).start();
    const grainPlayer = new Tone.GrainPlayer({
      url: selectedSampleUrl, // From the sample loader
      grainSize: grainSize,
      overlap: overlap,
      reverse: reverse,
    }).toDestination();

    // Update glitch effect state
    setGlitchEffect({
      stutter,
      grainPlayer,
      setStutterRate: (rate) => stutter.frequency.value = rate,
      setReverse: (rev) => grainPlayer.reverse = rev,
      setGrainSize: (size) => grainPlayer.grainSize = size,
      setOverlap: (ovl) => grainPlayer.overlap = ovl,
    });

    // Update effect chain
    synth.chain(stutter, grainPlayer, Tone.Destination);

    return () => {
      stutter.dispose();
      grainPlayer.dispose();
    };
  }, [synth]);

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

  // Update keyBindings with functions
  useEffect(() => {
    setKeyBindings((prevBindings) => ({
      ...prevBindings,
      controls: {
        ...prevBindings.controls,
        'arrowup': increaseFilterFrequency,
        'arrowdown': decreaseFilterFrequency,
        // Add more control bindings
      },
    }));
  }, []);

  return (
    <KeyBindingsContext.Provider value={{ keyBindings, setKeyBindings }}>
      <div className="p-4">
        <h1 className="text-4xl mb-4">Aphex Twin Music Generator</h1>
        <Controls playNote={playNote} updateSynthSettings={updateSynthSettings} />
        <VirtualKeyboard playNote={playNote} />
        <VocoderModule handleAudioInput={handleAudioInput} vocoder={vocoder} />
        <StepSequencer triggerNote={triggerNote} />
        <ModularSynth />
        <GlitchEffects glitchEffect={glitchEffect} />
        <TapeEmulation tapeEffect={tapeEffect} />
        <SampleLoader loadSample={loadSample} />
      </div>
    </KeyBindingsContext.Provider>

export default GlitchMusic;
