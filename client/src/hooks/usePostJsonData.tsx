import { useState, useCallback } from 'react';

export const usePostJsonData = (jsonUrl: RequestInfo | URL) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const postJsonData = useCallback(
    async (data: any) => {
      setLoading(true);
      try {
        const response = await fetch(jsonUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok from ${jsonUrl}`);
        }
        const jsonResponse = await response.json();
        setResponse(jsonResponse);
        setError(null);
      } catch (error) {
        console.error('Error posting JSON:', error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    },
    [jsonUrl],
  );

  return { response, loading, error, postJsonData };
};
