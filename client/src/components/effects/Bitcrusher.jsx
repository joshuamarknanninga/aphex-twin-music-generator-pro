// src/components/Effects/Bitcrusher.jsx
import React, { useContext, useEffect } from 'react';
import { Slider, Header } from 'semantic-ui-react';
import { SynthContext } from '../../contexts/SynthContext';
import * as Tone from 'tone';

const Bitcrusher = ({ settings, setSettings }) => {
  const { synth } = useContext(SynthContext);
  const [bitcrusher, setBitcrusher] = React.useState(null);

  useEffect(() => {
    const newBitcrusher = new Tone.BitCrusher(settings.bits).toDestination();
    if (synth) {
      synth.connect(newBitcrusher);
    }
    setBitcrusher(newBitcrusher);

    return () => {
      synth.disconnect(newBitcrusher);
      newBitcrusher.dispose();
    };
  }, [synth]);

  useEffect(() => {
    if (bitcrusher) {
      bitcrusher.bits = settings.bits;
      bitcrusher.wet.value = settings.wet;
    }
  }, [settings, bitcrusher]);

  const handleBitsChange = (e, { value }) => {
    setSettings({ ...settings, bits: value });
  };

  const handleWetChange = (e, { value }) => {
    setSettings({ ...settings, wet: value });
  };

  return (
    <div className="mb-4">
      <Header as="h4">Bitcrusher</Header>
      <div className="mb-2">
        <label>Bits: {settings.bits}</label>
        <Slider
          min={1}
          max={16}
          value={settings.bits}
          onChange={handleBitsChange}
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

export default Bitcrusher;
