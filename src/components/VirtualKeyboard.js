import React from 'react';

const VirtualKeyboard = ({ playNote }) => {
  const octaves = [3, 4, 5]; // 3 octaves
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const renderKeys = () => {
    return octaves.map((octave) =>
      notes.map((note, index) => {
        const isBlackKey = note.includes('#');
        const noteName = `${note}${octave}`;
        return (
          <div
            key={noteName}
            onClick={() => playNote(noteName)}
            className={`${
              isBlackKey ? 'black-key' : 'white-key'
            } key`}
            title={noteName}
          ></div>
        );
      })
    );
  };

  return (
    <div className="keyboard mt-4 flex">
      {renderKeys()}
    </div>
  );
};

export default VirtualKeyboard;
