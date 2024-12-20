// src/components/UI/DarkModeToggle.jsx
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Button icon onClick={() => setIsDark(!isDark)} basic>
      {isDark ? '🌞' : '🌙'}
    </Button>
  );
};

export default DarkModeToggle;
