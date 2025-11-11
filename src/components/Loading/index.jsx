import { FiLoader } from 'react-icons/fi';
import { Overlay, Spinner } from './styles';

export function Loading() {
  return (
    <Overlay>
      <Spinner>
        <FiLoader size={40} />
      </Spinner>
    </Overlay>
  );
}