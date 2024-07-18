import { useState, useCallback } from 'react';

type FileData = {
  name: string;
  data: string | ArrayBuffer | null;
};

const useLocalFileStorage = () => {
  const [files, setFiles] = useState<string[]>([]);

  const saveFileToLocal = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const fileData = event.target?.result;
      if (fileData) {
        localStorage.setItem(file.name, fileData as string);
        setFiles((prevFiles) => [...prevFiles, file.name]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(event.target.files || []);
      selectedFiles.forEach(saveFileToLocal);
    },
    [],
  );

  const loadFilesFromLocal = useCallback(() => {
    const storedFiles: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        storedFiles.push(key);
      }
    }
    setFiles(storedFiles);
  }, []);

  const removeFileFromLocal = useCallback((fileName: string) => {
    localStorage.removeItem(fileName);
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileName));
  }, []);

  return {
    files,
    handleFileChange,
    loadFilesFromLocal,
    removeFileFromLocal,
  };
};

export default useLocalFileStorage;
