import ButtonIcon from './ButtonIcon.jsx';
import { useAppCtx } from '../context/AppCtx.jsx';
import { TbTestPipe, TbTestPipeOff } from 'react-icons/tb';

function TestModeToggle() {
  const { isTestMode, toggleTestMode } = useAppCtx();

  return (
    <ButtonIcon
      onClick={toggleTestMode}
      title={isTestMode ? 'Production Mode' : 'Test Mode'}
    >
      {isTestMode ? <TbTestPipeOff /> : <TbTestPipe />}
    </ButtonIcon>
  );
}

export default TestModeToggle;
