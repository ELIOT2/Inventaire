import * as XLSX from "xlsx";

interface ExportButtonProps {
  data: any[];
}

const ExportButton = ({ data }: ExportButtonProps) => {
  const handleExportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
    XLSX.writeFile(workbook, "results.xlsx");
  };

  return (
    <button
      onClick={handleExportToXLSX}
      className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors"
    >
      Export to XLSX
    </button>
  );
};

export default ExportButton;