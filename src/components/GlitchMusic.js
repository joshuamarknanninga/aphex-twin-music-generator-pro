import React, { useEffect, useState, useRef, useContext, useCallback, useMemo } from 'react';
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
  const [player, setPlayer] = useState(null);
  const [tapeEffect, setTapeEffect] = useState(null);
  const [glitchEffect, setGlitchEffect] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const recorderRef = useRef(null);
  const { keyBindings, setKeyBindings } = useContext(KeyBindingsContext);

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

  // Memoize the synthesizer to prevent unnecessary re-creation
  const synth = useMemo(() => {
    const filter = new Tone.Filter(synthSettings.filterFrequency, 'lowpass', -12);
    const newSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: synthSettings.oscillator,
        count: 3,
        spread: 30,
      },
      envelope: synthSettings.envelope,
    });
    newSynth.chain(filter, Tone.Destination);
    return newSynth;
  }, [synthSettings]);

  // Memoized playNote function to avoid unnecessary re-renders
  const playNote = useCallback(
    (note) => {
      if (synth) {
        synth.triggerAttackRelease(note, '8n');
        socket.emit('noteOn', { note });
      }
    },
    [synth]
  );

  useEffect(() => {
    // Initialize the recorder
    const newRecorder = new Tone.Recorder();
    recorderRef.current = newRecorder;
    // Connect the recorder to the master output
    Tone.Destination.connect(newRecorder);
    setRecorder(newRecorder);

    // Clean up on unmount
    return () => {
      newRecorder.dispose();
    };
  }, []);

  useEffect(() => {
    // Initialize glitch effects
    const stutter = new Tone.Tremolo(4, 0.7).start(); // Using a default stutter rate
    const grainPlayer = new Tone.GrainPlayer({
      url: '', // Placeholder for sample loader URL
      grainSize: 0.2,
      overlap: 0.1,
      reverse: false,
    }).toDestination();

    // Update glitch effect state
    setGlitchEffect({
      stutter,
      grainPlayer,
      setStutterRate: (rate) => (stutter.frequency.value = rate),
      setReverse: (rev) => (grainPlayer.reverse = rev),
      setGrainSize: (size) => (grainPlayer.grainSize = size),
      setOverlap: (ovl) => (grainPlayer.overlap = ovl),
    });

    // Clean up on unmount
    return () => {
      if (stutter) stutter.dispose();
      if (grainPlayer) grainPlayer.dispose();
    };
  }, []);

  useEffect(() => {
    // MIDI Access
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    } else {
      console.warn('Web MIDI API is not supported in this browser.');
      // Optionally inform the user and enable alternative inputs
      enableAlternativeInputs();
    }
  }, []);

  const onMIDISuccess = (midiAccess) => {
    const inputs = midiAccess.inputs;
    inputs.forEach((input) => {
      input.onmidimessage = handleMIDIMessage;
    });
    midiAccess.onstatechange = (e) => {
      console.log(e.port.name, e.port.manufacturer, e.port.state);
    };
  };

  const onMIDIFailure = () => {
    console.warn('Could not access your MIDI devices.');
    // Optionally inform the user and enable alternative inputs
    enableAlternativeInputs();
  };

  const enableAlternativeInputs = () => {
    // Logic to ensure users can still interact with the app
    // e.g., show a message, enable virtual keyboard, etc.
    console.log('Enabling alternative inputs.');
  };

  const handleMIDIMessage = (message) => {
    const [command, note, velocity] = message.data;
    switch (command) {
      case 144: // noteOn
        if (velocity > 0) {
          playMIDINote(note, velocity);
        } else {
          stopMIDINote(note);
        }
        break;
      case 128: // noteOff
        stopMIDINote(note);
        break;
      default:
        break;
    }
  };

  const playMIDINote = (noteNumber, velocity) => {
    const note = Tone.Frequency(noteNumber, 'midi').toNote();
    const vel = velocity / 127;
    if (synth) {
      synth.triggerAttack(note, Tone.now(), vel);
    }
  };

  const stopMIDINote = (noteNumber) => {
    const note = Tone.Frequency(noteNumber, 'midi').toNote();
    if (synth) {
      synth.triggerRelease(note);
    }
  };

  useEffect(() => {
    // Update keyBindings with functions
    setKeyBindings((prevBindings) => ({
      ...prevBindings,
      controls: {
        ...prevBindings.controls,
        arrowup: increaseFilterFrequency,
        arrowdown: decreaseFilterFrequency,
        // Add more control bindings
      },
    }));
  }, [keyBindings, synthSettings]);

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

  const startRecording = async () => {
    await Tone.start();
    recorder.start();
    setRecording(true);
  };

  const stopRecording = async () => {
    setRecording(false);
    const recordingData = await recorder.stop();
    const url = URL.createObjectURL(recordingData);
    setAudioUrl(url);
  };

  const loadSample = (buffer) => {
    const newPlayer = new Tone.Player(buffer).toDestination();
    newPlayer.start();
    setPlayer(newPlayer);
  };

  const updateSynthSettings = (newSettings) => {
    setSynthSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  useEffect(() => {
    // Clean up Tone.js nodes on unmount
    return () => {
      if (synth) {
        synth.dispose();
      }
      if (glitchEffect) {
        glitchEffect.dispose();
      }
      // Dispose of other Tone.js nodes as needed
    };
  }, [synth, glitchEffect]);

  return (
    <KeyBindingsContext.Provider value={{ keyBindings, setKeyBindings }}>
      <div className="p-4">
        <h1 className="text-4xl mb-4">Aphex Twin Music Generator</h1>
        <Controls playNote={playNote} updateSynthSettings={updateSynthSettings} />
        <VirtualKeyboard playNote={playNote} />
        <VocoderModule handleAudioInput={() => {}} vocoder={{}} />
        <StepSequencer triggerNote={(note, time, duration) => playNote(note)} />
        <ModularSynthInterface />
        <GlitchEffects glitchEffect={glitchEffect} />
        <TapeEmulation tapeEffect={tapeEffect} />
        <SampleLoader loadSample={loadSample} />

        <div className="bg-gray-800 p-4 rounded mt-4">
          <h2 className="text-2xl mb-2">Recording</h2>
          {recording ? (
            <button
              onClick={stopRecording}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Stop Recording
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Recording
            </button>
          )}
          {audioUrl && (
            <div className="mt-4">
              <audio controls src={audioUrl}></audio>
              <a
                href={audioUrl}
                download="aphex-twin-creation.wav"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Download Recording
              </a>
            </div>
          )}
        </div>
      </div>
    </KeyBindingsContext.Provider>
  );
};

export default GlitchMusic;
