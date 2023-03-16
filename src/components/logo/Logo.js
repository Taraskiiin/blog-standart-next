import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

export const Logo = () => {
  return (
    <div className='text-3xl text-center py-4 font-heading'>
      <span>AI-Next</span>
      <FontAwesomeIcon icon={faRobot} className='text-2xl text-blue-300' />
    </div>
  );
};
