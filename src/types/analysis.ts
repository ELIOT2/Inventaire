// Define the base data structure for zone data
export interface ZoneData {
  ean: string;
  quantity: number; // Changed from qte to quantity to match index.ts
  zone: string;
  [key: string]: any;
}

// Define the structure for imported Excel data
export interface ImportedData {
  EAN: string;
  QTE: number;
  Zone: string;
  [key: string]: any;
}

// Define the structure for analysis results
export interface AnalysisResult {
  EAN: string;
  count: number;
  totalQTE: number;
  zones: string[];
}