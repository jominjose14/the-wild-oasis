import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState.js';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const doesPreferDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    doesPreferDarkMode,
    'isDarkMode'
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
        document.documentElement.classList.add('light-mode');
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const value = useContext(DarkModeContext);
  if (value === undefined)
    throw new Error('DarkModeContext was used outside DarkModeProvider');
  return value;
}

export { DarkModeProvider, useDarkMode };
