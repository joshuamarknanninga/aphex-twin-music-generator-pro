import React, { useState, useEffect } from 'react';

const VirtualKeyboard = ({ playNote }) => {
  const [activeKeys, setActiveKeys] = useState([]);
  const octaves = [4]; // Limit to one octave for home keys
  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D'];
  const keyBindings = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];

  const noteToKey = {};
  const keyToNote = {};
  notes.forEach((note, index) => {
    const noteName = note + octaves[0];
    const key = keyBindings[index];
    noteToKey[noteName] = key;
    keyToNote[key] = noteName;
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (key in keyToNote && !activeKeys.includes(key)) {
        setActiveKeys((prevKeys) => [...prevKeys, key]);
        playNoteFromKeyboard(keyToNote[key]);
      }
    };

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();
      setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeKeys]);

  const playNoteFromKeyboard = (note) => {
    playNote(note);
  };

  const renderKeys = () => {
    return notes.map((note, index) => {
      const noteName = note + octaves[0];
      const key = keyBindings[index];
      const isActive = activeKeys.includes(key);
      return (
        <div
          key={noteName}
          className={`white-key key ${isActive ? 'active' : ''}`}
          onMouseDown={() => playNote(noteName)}
          title={`${noteName} (${key.toUpperCase()})`}
        >
          <span className="key-label">{key.toUpperCase()}</span>
        </div>
      );
    });
  };

  return (
    <div className="keyboard mt-4 flex">
      {renderKeys()}
    </div>
  );
};

export default VirtualKeyboard;

