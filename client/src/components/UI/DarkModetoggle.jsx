// src/components/UI/DarkModeToggle.jsx
import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700"
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
