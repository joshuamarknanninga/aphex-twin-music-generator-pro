import React, { useContext, useState } from 'react';
import { KeyBindingsContext, defaultKeyBindings } from '../utils/KeyBindings';

const Settings = () => {
  const { keyBindings, setKeyBindings } = useContext(KeyBindingsContext);
  const [bindings, setBindings] = useState({ ...keyBindings });

  const handleInputChange = (category, action, event) => {
    const newKey = event.target.value.toLowerCase();

    // Validation: Check for duplicate keys
    const allKeys = Object.values(bindings)
      .map((mapping) => Object.keys(mapping))
      .flat();
    if (allKeys.includes(newKey)) {
      alert('This key is already assigned to another action.');
      return;
    }

    setBindings((prevBindings) => {
      // Remove old key
      const updatedCategory = Object.fromEntries(
        Object.entries(prevBindings[category]).filter(([key]) => prevBindings[category][key] !== action)
      );
      // Assign new key
      updatedCategory[newKey] = action;

      return {
        ...prevBindings,
        [category]: updatedCategory,
      };
    });
  };

  const saveBindings = () => {
    setKeyBindings(bindings);
    alert('Key bindings saved.');
  };

  const resetBindings = () => {
    setBindings({ ...defaultKeyBindings });
    setKeyBindings({ ...defaultKeyBindings });
    alert('Key bindings reset to default.');
  };

  return (
    <div className="settings bg-gray-800 p-4 rounded mt-4">
      <h2 className="text-2xl mb-4">Customize Key Bindings</h2>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Notes</h3>
        {Object.entries(bindings.notes).map(([key, note]) => (
          <div key={note} className="mb-2">
            <label>
              Note: {note} - Key:
              <input
                type="text"
                maxLength="1"
                value={key}
                onChange={(e) => handleInputChange('notes', note, e)}
                className="ml-2 p-1 text-black"
              />
            </label>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Controls</h3>
        {Object.entries(bindings.controls).map(([key, action]) => (
          <div key={action} className="mb-2">
            <label>
              Action: {action} - Key:
              <input
                type="text"
                value={key}
                onChange={(e) => handleInputChange('controls', action, e)}
                className="ml-2 p-1 text-black"
              />
            </label>
          </div>
        ))}
      </div>
      {/* Add similar sections for sequencer and other categories */}
      <button
        onClick={saveBindings}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Save Key Bindings
      </button>
      <button
        onClick={resetBindings}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Reset to Default
      </button>
    </div>
  );
};

export default Settings;
