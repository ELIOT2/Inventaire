import React, { useContext } from 'react';
import { ResultsTable } from '../components/ResultsTable';
import { FileContext } from '../context/FileContext';
import * as XLSX from 'xlsx';

const ResultsPage = () => {
  const { processedFiles } = useContext(FileContext)!;

  // Combine all data from processed files
  const allData = processedFiles.flatMap((file) => file.data);

  const handleExportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(allData); // Convert data to worksheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results'); // Append the worksheet
    XLSX.writeFile(workbook, 'results.xlsx'); // Trigger download
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
          Export to Excel
        </button>
        <ResultsTable data={allData} />
      </div>
    </div>
  );
};

export default ResultsPage;
