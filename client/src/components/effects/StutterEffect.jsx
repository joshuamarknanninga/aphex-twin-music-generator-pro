// src/components/Effects/StutterEffect.jsx
import React, { useContext, useEffect } from 'react';
import { Slider, Header } from 'semantic-ui-react';
import { SynthContext } from '../../contexts/SynthContext';
import * as Tone from 'tone';

const StutterEffect = ({ settings, setSettings }) => {
  const { synth } = useContext(SynthContext);
  const [stutter, setStutter] = React.useState(null);

  useEffect(() => {
    const newStutter = new Tone.FeedbackDelay(settings.rate, 0.5).toDestination();
    if (synth) {
      synth.connect(newStutter);
    }
    setStutter(newStutter);

    return () => {
      synth.disconnect(newStutter);
      newStutter.dispose();
    };
  }, [synth]);

  useEffect(() => {
    if (stutter) {
      stutter.delayTime.value = 1 / settings.rate;
      stutter.wet.value = settings.wet;
    }
  }, [settings, stutter]);

  const handleRateChange = (e, { value }) => {
    setSettings({ ...settings, rate: value });
  };

  const handleWetChange = (e, { value }) => {
    setSettings({ ...settings, wet: value });
  };

  return (
    <div className="mb-4">
      <Header as="h4">Stutter Effect</Header>
      <div className="mb-2">
        <label>Rate (Hz): {settings.rate}</label>
        <Slider
          min={1}
          max={10}
          value={settings.rate}
          onChange={handleRateChange}
        />
      </div>
      <div>
        <label>Wet: {settings.wet}</label>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={settings.wet}
          onChange={handleWetChange}
        />
      </div>
    </div>
  );
};

export default StutterEffect;
