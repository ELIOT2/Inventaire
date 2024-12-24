import React, { createContext, useState, ReactNode } from 'react';
import { ProcessedFile } from '../types';

interface FileContextType {
  processedFiles: ProcessedFile[];
  setProcessedFiles: React.Dispatch<React.SetStateAction<ProcessedFile[]>>;
}

export const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);

  return (
    <FileContext.Provider value={{ processedFiles, setProcessedFiles }}>
      {children}
    </FileContext.Provider>
  );
};
