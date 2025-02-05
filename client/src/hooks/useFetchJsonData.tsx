import { useState, useEffect } from 'react';

export const useFetchJsonData = (jsonUrl: RequestInfo | URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
          throw new Error(`Network response was not ok from ${jsonUrl}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (error) {
        console.error('Error fetching JSON:', error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jsonUrl]);

  return { data, loading, error };
};
