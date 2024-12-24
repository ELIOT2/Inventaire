import React, { useEffect, useContext } from "react";
import { fetchFilesFromFirestore } from "../lib/firestore";
import { FileContext } from "../context/FileContext";
import { ResultsTable } from "../components/ResultsTable";
import * as XLSX from "xlsx";

const ResultsPage = () => {
  const { processedFiles, setProcessedFiles } = useContext(FileContext)!;

  useEffect(() => {
    const fetchFiles = async () => {
      const fetchedFiles = await fetchFilesFromFirestore();
      setProcessedFiles(fetchedFiles);
    };
    fetchFiles();
  }, [setProcessedFiles]);

  // Combine all data from processed files
  const allData = processedFiles.flatMap((file) => file.data);

  const handleExportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
    XLSX.writeFile(workbook, "results.xlsx");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Processed Results</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Results ({allData.length} items)
        </h2>
        <button
          onClick={handleExportToXLSX}
          className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 mb-4"
        >
          Export to XLSX
        </button>
        <ResultsTable data={allData} />
      </div>
    </div>
  );
};

export default ResultsPage;
