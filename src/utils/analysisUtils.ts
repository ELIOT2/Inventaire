import { ImportedData, AnalysisResult } from '../types/analysis';

export const analyzeData = (
  importedData: ImportedData[],
  generatedData: ImportedData[]
): AnalysisResult[] => {
  return importedData.map((importedItem) => {
    const matches = generatedData.filter(
      (genItem) => genItem.EAN === importedItem.EAN
    );

    if (matches.length === 0) {
      return {
        EAN: importedItem.EAN,
        count: 0,
        totalQTE: importedItem.QTE || 0,
        zones: [importedItem.Zone || ''],
      };
    }

    return {
      EAN: importedItem.EAN,
      count: matches.length,
      totalQTE: matches.reduce((sum, item) => sum + (item.QTE || 0), 0),
      zones: [...new Set(matches.map((item) => item.Zone))],
    };
  });
};