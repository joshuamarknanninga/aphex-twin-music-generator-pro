import React, { createContext, useState, useEffect } from 'react';

export const defaultKeyBindings = {
  notes: {
    // Default key to note mappings
    'a': 'C4',
    'w': 'C#4',
    's': 'D4',
    'e': 'D#4',
    'd': 'E4',
    'f': 'F4',
    't': 'F#4',
    'g': 'G4',
    'y': 'G#4',
    'h': 'A4',
    'u': 'A#4',
    'j': 'B4',
    'k': 'C5',
  },
  controls: {
    // Default key to control mappings
    'arrowup': 'increaseFilterFrequency',
    'arrowdown': 'decreaseFilterFrequency',
    // Add more controls as needed
  },
  sequencer: {
    // Default key to sequencer control mappings
    'space': 'toggleSequencer',
    // Add more sequencer controls as needed
  },
};

export const KeyBindingsContext = createContext();

export const KeyBindingsProvider = ({ children }) => {
  const [keyBindings, setKeyBindings] = useState(() => {
    // Load key bindings from localStorage if available
    const savedBindings = localStorage.getItem('keyBindings');
    return savedBindings ? JSON.parse(savedBindings) : defaultKeyBindings;
  });

  useEffect(() => {
    // Save key bindings to localStorage whenever they change
    localStorage.setItem('keyBindings', JSON.stringify(keyBindings));
  }, [keyBindings]);

  return (
    <KeyBindingsContext.Provider value={{ keyBindings, setKeyBindings }}>
      {children}
    </KeyBindingsContext.Provider>
  );
};
