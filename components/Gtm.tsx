import TagManager from 'react-gtm-module';

const Gtm = () => {
  if (typeof window !== 'undefined') {
    TagManager.initialize({
      gtmId: process.env.NEXT_PUBLIC_GTM_ID as string,
    });
  }

  return null;
};

export default Gtm;
