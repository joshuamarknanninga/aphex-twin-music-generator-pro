// src/components/Sequencer/StepSequencer.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Grid, Checkbox, Slider, Header } from 'semantic-ui-react';
import { SynthContext } from '../../contexts/SynthContext';
import * as Tone from 'tone';

const StepSequencer = () => {
  const { synth } = useContext(SynthContext);
  const [steps, setSteps] = useState(Array(32).fill(false));
  const [currentStep, setCurrentStep] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [loop, setLoop] = useState(true);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.loop = loop;
    Tone.Transport.loopStart = 0;
    Tone.Transport.loopEnd = '32n';

    const repeat = (time) => {
      if (steps[currentStep]) {
        synth.triggerAttackRelease('C4', '8n', time);
      }
      setCurrentStep((prev) => (prev + 1) % steps.length);
    };

    Tone.Transport.scheduleRepeat(repeat, '32n');
    Tone.Transport.start();

    return () => {
      Tone.Transport.cancel();
      Tone.Transport.stop();
    };
  }, [steps, bpm, loop, synth, currentStep]);

  const toggleStep = (index) => {
    const newSteps = [...steps];
    newSteps[index] = !newSteps[index];
    setSteps(newSteps);
  };

  const handleBpmChange = (e, { value }) => {
    setBpm(value);
  };

  const handleLoopChange = (e, { checked }) => {
    setLoop(checked);
  };

  return (
    <div className="p-4 bg-gray-800 text-white">
      <Header as="h3">32-Step Sequencer</Header>
      <div className="mb-4">
        <label>BPM: {bpm}</label>
        <Slider
          min={60}
          max={200}
          value={bpm}
          onChange={handleBpmChange}
        />
      </div>
      <div className="mb-4">
        <Checkbox
          label="Loop"
          checked={loop}
          onChange={handleLoopChange}
        />
      </div>
      <Grid columns={8} divided>
        {steps.map((step, index) => (
          <Grid.Column key={index}>
            <Checkbox
              toggle
              checked={step}
              onChange={() => toggleStep(index)}
            />
            <span className={currentStep === index ? 'text-blue-400' : ''}>
              Step {index + 1}
            </span>
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default StepSequencer;
