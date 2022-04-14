import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const Gtm = () => {

  useEffect(() => {
    TagManager.initialize({
      gtmId: process.env.NEXT_PUBLIC_GTM_ID as string,
    });
  }, []);

  return null;
};

export default Gtm;
