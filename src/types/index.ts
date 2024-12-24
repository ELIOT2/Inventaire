export interface ZoneData {
  ean: string;
  quantity: number;
  zone: string;
}

export interface ProcessedFile {
  id: string; // Firestore document ID
  name: string; // File name
  data: ZoneData[]; // Processed data
}
