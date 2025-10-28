import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT } from '../config/adsense';

const GoogleAd = ({
  adSlot,
  className = '',
  style = {},
  format = 'auto',
  responsive = 'true'
}) => {
  const adRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const adElement = adRef.current;
    if (!adElement || !adSlot) return;

    try {
      if (!adElement.getAttribute('data-adsbygoogle-status')) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Adsense ad error', error);
    }
  }, [adSlot]);

  if (!adSlot) {
    return null;
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle block ${className}`.trim()}
      style={{ display: 'block', ...style }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={adSlot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  );
};

export default GoogleAd;
