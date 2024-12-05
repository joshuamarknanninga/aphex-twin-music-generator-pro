// src/hooks/useMusicGeneration.js
import { useState } from 'react';
import { generateMusic } from '../services/musicService';

const useMusicGeneration = () => {
  const [musicData, setMusicData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async (settings) => {
    setLoading(true);
    try {
      const data = await generateMusic(settings);
      setMusicData(data);
    } catch (error) {
      console.error('Error generating music:', error);
    } finally {
      setLoading(false);
    }
  };

  return { musicData, loading, generateMusic: generate };
};

export default useMusicGeneration;
