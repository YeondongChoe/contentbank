import { useState, useEffect } from 'react';

import { decode } from 'base-64';

export const useJwtDecode = (jwtToken: string) => {
  const [decodingInfo, setDecodingInfo] = useState<any | null>(null);

  useEffect(() => {
    if (jwtToken) {
      try {
        const payload = jwtToken.substring(
          jwtToken.indexOf('.') + 1,
          jwtToken.lastIndexOf('.'),
        );
        const decodingInfo = decode(payload);
        const decodingInfoJson = JSON.parse(decodingInfo);
        setDecodingInfo(decodingInfoJson);
      } catch (error) {
        console.error('Error decoding JWT token:', error);
        setDecodingInfo(null);
      }
    }
  }, [jwtToken]);

  return decodingInfo;
};
