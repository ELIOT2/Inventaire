import React, { useContext } from 'react';
import { FileContext } from '../context/FileContext';
import Layout from "../components/Layout";

const AnalyticsDashboard = () => {
  const { processedFiles } = useContext(FileContext)!;

  const totalItems = processedFiles
    .flatMap((file) => file.data)
    .reduce((sum, item) => sum + 1, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="p-4 bg-blue-50 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Total Items</h3>
          <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsDashboard;