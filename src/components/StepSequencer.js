import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

const StepSequencer = ({ triggerNote }) => {
  const [sequence, setSequence] = useState(
    Array(32).fill(null).map(() => ({ note: null, active: false }))
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const toggleStep = (index, note) => {
    setSequence((prevSequence) => {
      const newSequence = [...prevSequence];
      newSequence[index] = {
        note,
        active: !newSequence[index].active,
      };
      return newSequence;
    });
  };

  const startSequencer = () => {
    if (!isPlaying) {
      const seq = new Tone.Sequence(
        (time, step) => {
          if (step.active && step.note) {
            triggerNote(step.note, time, '16n');
          }
        },
        sequence,
        '16n'
      ).start(0);

      Tone.Transport.start();
      setIsPlaying(true);

      // Stop sequencer when component unmounts
      return () => {
        seq.dispose();
        Tone.Transport.stop();
      };
    } else {
      Tone.Transport.stop();
      setIsPlaying(false);
    }
  };

  const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];

  return (
    <div className="bg-gray-800 p-4 rounded mt-4">
      <h2 className="text-2xl mb-2">32-Step Sequencer</h2>

      {/* BPM Control */}
      <div className="mb-4">
        <label className="block">BPM ({bpm})</label>
        <input
          type="range"
          min="60"
          max="200"
          step="1"
          value={bpm}
          onChange={(e) => setBpm(parseInt(e.target.value, 10))}
          className="w-full"
        />
      </div>

      {/* Sequencer Grid */}
      <div className="overflow-x-auto">
        <table className="table-auto">
          <thead>
            <tr>
              <th></th>
              {sequence.map((_, index) => (
                <th key={index} className="px-1">
                  {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note}>
                <td className="pr-2">{note}</td>
                {sequence.map((step, index) => (
                  <td key={index}>
                    <input
                      type="checkbox"
                      checked={step.active && step.note === note}
                      onChange={() => toggleStep(index, note)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={startSequencer}
        className={`mt-4 ${
          isPlaying ? 'bg-red-500' : 'bg-green-500'
        } hover:bg-opacity-75 text-white font-bold py-2 px-4 rounded`}
      >
        {isPlaying ? 'Stop Sequencer' : 'Start Sequencer'}
      </button>
    </div>
  );
};

export default StepSequencer;
