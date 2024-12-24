export interface ZoneData {
  ean: string; // EAN code
  quantity: number; // Quantity
  zone: string; // Zone
}

export interface ProcessedFile {
  name: string; // File name
  data: ZoneData[]; // Array of ZoneData
}
