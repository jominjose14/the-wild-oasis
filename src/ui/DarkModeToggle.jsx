import ButtonIcon from './ButtonIcon.jsx';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useAppCtx } from '../context/AppCtx.jsx';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useAppCtx();

  return (
    <ButtonIcon
      onClick={toggleDarkMode}
      title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
    >
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
