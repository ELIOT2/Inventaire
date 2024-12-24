import React from 'react';
import { Upload } from 'lucide-react';

interface FileImportProps {
  onFileSelect: (file: File) => void;
  accept: string;
  label: string;
}

const FileImport: React.FC<FileImportProps> = ({ onFileSelect, accept, label }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="relative cursor-pointer">
        <input
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Upload size={20} />
          <span>{label}</span>
        </div>
      </label>
    </div>
  );
};

export default FileImport;