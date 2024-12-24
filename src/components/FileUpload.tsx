import React, { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileContext } from "../context/FileContext";
import { processFileContent } from "../lib/fileProcessor";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export function FileUpload() {
  const { processedFiles, setProcessedFiles } = useContext(FileContext)!;
  const [progress, setProgress] = useState<number>(0); // Progress state
  const [isUploading, setIsUploading] = useState<boolean>(false); // Upload state

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true); // Start uploading
      setProgress(0); // Reset progress

      const newProcessedFiles = [...processedFiles];
      const totalFiles = acceptedFiles.length;

      for (const [index, file] of acceptedFiles.entries()) {
        const content = await file.text();
        const data = processFileContent(content); // Process file data

        try {
          await addDoc(collection(db, "uploadedFiles"), {
            name: file.name,
            data: data,
            uploadedAt: new Date().toISOString(),
          });
          newProcessedFiles.push({
            id: `${file.name}-${Date.now()}`, // Temporary ID
            name: file.name,
            data,
          });

          // Update progress
          const progressPercentage = Math.round(((index + 1) / totalFiles) * 100);
          setProgress(progressPercentage);
        } catch (error) {
          console.error(`Error saving ${file.name}:`, error);
        }
      }

      setProcessedFiles(newProcessedFiles);
      setIsUploading(false); // Upload complete
    },
    [processedFiles, setProcessedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/plain": [".txt"] },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-lg font-medium text-gray-700">
          Drag & drop TXT files here
        </p>
      </div>

      {/* Progress Bar */}
      {isUploading && (
        <div className="mt-4">
          <div className="relative w-full bg-gray-200 rounded-lg h-4">
            <div
              className="absolute top-0 left-0 h-4 bg-blue-500 rounded-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{progress}%</p>
        </div>
      )}
    </div>
  );
}
