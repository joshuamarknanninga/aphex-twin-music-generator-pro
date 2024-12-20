// src/components/Effects/EffectsRack.jsx
import React, { useState } from 'react';
import Bitcrusher from './Bitcrusher';
import StutterEffect from './StutterEffect';
import { Segment, Header } from 'semantic-ui-react';

const EffectsRack = () => {
  const [bitcrusherSettings, setBitcrusherSettings] = useState({
    bits: 8,
    wet: 0.5,
  });

  const [stutterSettings, setStutterSettings] = useState({
    rate: 4,
    wet: 0.5,
  });

  return (
    <Segment className="bg-gray-700 text-white">
      <Header as="h3">Effects Rack</Header>
      <Bitcrusher settings={bitcrusherSettings} setSettings={setBitcrusherSettings} />
      <StutterEffect settings={stutterSettings} setSettings={setStutterSettings} />
      {/* Add more effects as needed */}
    </Segment>
  );
};

export default EffectsRack;
