import { useEffect, useState } from 'react';
import { getSignupImageSize } from './getSignupImageSize';

export const useSignupImageSize = () => {
  const [size, setSize] = useState(() => getSignupImageSize(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setSize(getSignupImageSize(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};
