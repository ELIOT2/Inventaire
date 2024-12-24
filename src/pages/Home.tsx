import React, { useEffect, useContext } from "react";
import { fetchFilesFromFirestore, deleteFileFromFirestore } from "../lib/firestore";
import { FileContext } from "../context/FileContext";
import { FileUpload } from "../components/FileUpload";
import Layout from "../components/Layout";
import { Loader2, Trash2, AlertCircle } from "lucide-react";

const Home = () => {
  const context = useContext(FileContext);
  
  if (!context) {
    throw new Error("Home must be used within a FileProvider");
  }

  const { processedFiles, setProcessedFiles } = context;
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        const fetchedFiles = await fetchFilesFromFirestore();
        setProcessedFiles(fetchedFiles);
        setError(null);
      } catch (err) {
        setError("Failed to fetch files. Please try again later.");
        console.error("Error fetching files:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFiles();
  }, [setProcessedFiles]);

  const handleRemoveFile = async (id: string) => {
    try {
      await deleteFileFromFirestore(id);
      setProcessedFiles((prev) => prev.filter((file) => file.id !== id));
    } catch (err) {
      console.error("Error removing file:", err);
      setError("Failed to remove file. Please try again.");
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="text-red-500 w-5 h-5" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Upload and Process Files</h1>
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading files...</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <FileUpload />
        </div>

        {!isLoading && processedFiles.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Uploaded Files ({processedFiles.length})
            </h2>
            <div className="space-y-3">
              {processedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {file.data.length} items processed
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(file.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove file"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && processedFiles.length === 0 && (
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              No files uploaded yet. Use the upload section above to get started.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;