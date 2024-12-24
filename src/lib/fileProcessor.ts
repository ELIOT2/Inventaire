import { ZoneData } from '../types';

export const processFileContent = (content: string): ZoneData[] => {
  const results: ZoneData[] = [];
  const zonePattern = /^ZONE\s?[A-Z]\d|^[A-Z]\d$/i;
  const eanPattern = /(\d{12,13}),(\d+)/;

  let currentZone: string | null = null;

  content.split('\n').forEach((line) => {
    const trimmedLine = line.trim();

    if (zonePattern.test(trimmedLine)) {
      currentZone = trimmedLine.replace(/ZONE\s?/i, '').split(',')[0]; // Clean the zone value here
    } else if (eanPattern.test(trimmedLine) && currentZone) {
      const [, ean, qte] = trimmedLine.match(eanPattern) || [];
      if (ean && qte) {
        results.push({
          ean,
          quantity: parseInt(qte, 10),
          zone: currentZone,
        });
      }
    }
  });

  return results;
};
