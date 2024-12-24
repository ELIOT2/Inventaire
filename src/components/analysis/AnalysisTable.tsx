import React from 'react';
import { AnalysisResult } from '../../types/analysis';

interface AnalysisTableProps {
  results: AnalysisResult[];
}

const AnalysisTable: React.FC<AnalysisTableProps> = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No analysis results available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              EAN
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Count
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total QTE
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Zones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((result, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.EAN}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.count}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.totalQTE}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.zones.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalysisTable;