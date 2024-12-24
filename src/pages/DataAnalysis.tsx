import React, { useState, useContext } from 'react';
import { FileContext } from '../context/FileContext';
import Layout from '../components/Layout';
import FileImport from '../components/analysis/FileImport';
import AnalysisTable from '../components/analysis/AnalysisTable';
import ExportButton from '../components/ExportButton';
import { readExcelFile } from '../utils/excelUtils';
import { analyzeData } from '../utils/analysisUtils';
import { ImportedData, AnalysisResult } from '../types/analysis';
import { ZoneData } from '../types/index';
import { Loader2 } from 'lucide-react';

const DataAnalysis: React.FC = () => {
  const { processedFiles } = useContext(FileContext)!;
  const [importedData, setImportedData] = useState<ImportedData[]>([]);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExcelImport = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await readExcelFile(file);
      setImportedData(data);
      
      // Convert ZoneData to ImportedData structure, mapping quantity to QTE
      const generatedData = processedFiles.flatMap((file) => 
        file.data.map((item: ZoneData) => ({
          EAN: item.ean,
          QTE: item.quantity, // Changed from qte to quantity to match the interface
          Zone: item.zone,
        }))
      );
      
      const results = analyzeData(data, generatedData);
      setAnalysisResults(results);
    } catch (err) {
      setError('Failed to import Excel file. Please check the file format.');
      console.error('Error importing Excel:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Data Analysis</h1>
          <div className="flex items-center space-x-4">
            <FileImport
              onFileSelect={handleExcelImport}
              accept=".xlsx,.xls"
              label="Import Excel File"
            />
            {analysisResults.length > 0 && (
              <ExportButton data={analysisResults} />
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <AnalysisTable results={analysisResults} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DataAnalysis;