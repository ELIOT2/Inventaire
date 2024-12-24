import React, { useEffect, useContext, useState } from "react";
import { fetchFilesFromFirestore } from "../lib/firestore";
import { FileContext } from "../context/FileContext";
import { ResultsTable } from "../components/ResultsTable";
import ExportButton from "../components/ExportButton";
import ResultsHeader from "../components/ResultsHeader";
import Layout from "../components/Layout";
import { Loader2 } from "lucide-react";

const ResultsPage = () => {
  const { processedFiles, setProcessedFiles } = useContext(FileContext)!;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        const fetchedFiles = await fetchFilesFromFirestore();
        setProcessedFiles(fetchedFiles);
        setError(null);
      } catch (err) {
        setError("Failed to fetch results. Please try again later.");
        console.error("Error fetching results:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFiles();
  }, [setProcessedFiles]);

  const allData = processedFiles.flatMap((file) => file.data);

  if (error) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <ResultsHeader itemCount={allData.length} />
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4">
              <ExportButton data={allData} />
            </div>
            <ResultsTable data={allData} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ResultsPage;