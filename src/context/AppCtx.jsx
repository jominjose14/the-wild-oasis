import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState.js';

const AppCtx = createContext();

function AppCtxProvider({ children }) {
  const doesPreferDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    doesPreferDarkMode,
    'isDarkMode'
  );
  const [isTestMode, setIsTestMode] = useLocalStorageState(true, 'isTestMode');

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

  function toggleTestMode() {
    setIsTestMode((isTestMode) => !isTestMode);
  }

  return (
    <AppCtx.Provider
      value={{ isDarkMode, toggleDarkMode, isTestMode, toggleTestMode }}
    >
      {children}
    </AppCtx.Provider>
  );
}

function useAppCtx() {
  const value = useContext(AppCtx);
  if (value === undefined)
    throw new Error('AppCtx was used outside AppCtxProvider');
  return value;
}

export { AppCtxProvider, useAppCtx };
