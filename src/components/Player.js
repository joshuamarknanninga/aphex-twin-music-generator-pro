// src/components/Player.js
import React from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';

const Player = ({ music }) => {
  return (
    <Segment>
      <Header as="h3">Your Generated Music</Header>
      <audio controls src={music.audioUrl}>
        Your browser does not support the audio element.
      </audio>
      <div style={{ marginTop: '1em' }}>
        <Icon name="download" />
        <a href={music.audioUrl} download="generated_music.mp3">
          Download Your Music
        </a>
      </div>
    </Segment>
  );
};

export default Player;
