import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileContext } from '../context/FileContext';
import { processFileContent } from '../lib/fileProcessor';

export function FileUpload() {
  const { processedFiles, setProcessedFiles } = useContext(FileContext)!;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newProcessedFiles = [...processedFiles];

      for (const file of acceptedFiles) {
        const content = await file.text();
        const data = processFileContent(content);
        newProcessedFiles.push({
          name: file.name,
          data,
        });
      }

      setProcessedFiles(newProcessedFiles); // Update global context
    },
    [processedFiles, setProcessedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': ['.txt'] },
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-lg font-medium text-gray-700">
        {isDragActive ? 'Drop the files here' : 'Drag & drop TXT files here'}
      </p>
      <p className="mt-2 text-sm text-gray-500">or click to select files</p>
    </div>
  );
}
