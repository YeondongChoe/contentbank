import { useState, useEffect } from 'react';

export const usePortal = (id: string) => {
  const [_document, set_document] = useState<any>(null);

  useEffect(() => {
    set_document(document);
  }, []);

  return _document?.querySelector(`#${id}`);
};
