// src/components/MusicGenerator.js
import React, { useState } from 'react';
import { Segment, Header, Form, Button, Dropdown, Loader, Dimmer } from 'semantic-ui-react';
import Player from './Player';
import useMusicGeneration from '../hooks/useMusicGeneration';

const MusicGenerator = () => {
  const [settings, setSettings] = useState({
    tempo: 120,
    key: 'C',
    scale: 'Minor',
  });
  const { musicData, loading, generateMusic } = useMusicGeneration();

  const handleChange = (e, { name, value }) => {
    setSettings({ ...settings, [name]: value });
  };

  const handleGenerate = () => {
    generateMusic(settings);
  };

  const keyOptions = [
    { key: 'C', text: 'C', value: 'C' },
    { key: 'C#', text: 'C#', value: 'C#' },
    { key: 'D', text: 'D', value: 'D' },
    { key: 'D#', text: 'D#', value: 'D#' },
    { key: 'E', text: 'E', value: 'E' },
    { key: 'F', text: 'F', value: 'F' },
    { key: 'F#', text: 'F#', value: 'F#' },
    { key: 'G', text: 'G', value: 'G' },
    { key: 'G#', text: 'G#', value: 'G#' },
    { key: 'A', text: 'A', value: 'A' },
    { key: 'A#', text: 'A#', value: 'A#' },
    { key: 'B', text: 'B', value: 'B' },
  ];

  const scaleOptions = [
    { key: 'minor', text: 'Minor', value: 'Minor' },
    { key: 'major', text: 'Major', value: 'Major' },
  ];

  return (
    <Segment>
      <Header as="h2">Generate Your Music</Header>
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            label="Tempo (BPM)"
            name="tempo"
            type="number"
            value={settings.tempo}
            onChange={handleChange}
            placeholder="e.g., 120"
            min="60"
            max="200"
          />
          <Form.Field>
            <label>Key</label>
            <Dropdown
              placeholder="Select Key"
              fluid
              selection
              options={keyOptions}
              name="key"
              value={settings.key}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Scale</label>
            <Dropdown
              placeholder="Select Scale"
              fluid
              selection
              options={scaleOptions}
              name="scale"
              value={settings.scale}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Button primary onClick={handleGenerate} disabled={loading}>
          Generate
        </Button>
      </Form>
      {loading && (
        <Dimmer active inverted>
          <Loader>Generating Music...</Loader>
        </Dimmer>
      )}
      {musicData && <Player music={musicData} />}
    </Segment>
  );
};

export default MusicGenerator;
