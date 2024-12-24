import React, { useContext } from 'react';
import { FileUpload } from '../components/FileUpload';
import { FileContext } from '../context/FileContext';

const Home = () => {
  const { processedFiles, setProcessedFiles } = useContext(FileContext)!;

  const handleRemoveFile = (index: number) => {
    const updatedFiles = processedFiles.filter((_, i) => i !== index);
    setProcessedFiles(updatedFiles); // Update the global context
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Upload and Process Files</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <FileUpload />
      </div>

      {processedFiles.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Uploaded Files:</h2>
          <div className="space-y-4">
            {processedFiles.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="text-sm font-medium text-gray-700">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {file.data.length} items
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
