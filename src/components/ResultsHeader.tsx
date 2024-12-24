interface ResultsHeaderProps {
    itemCount: number;
  }
  
  const ResultsHeader = ({ itemCount }: ResultsHeaderProps) => {
    return (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Processed Results</h1>
        <span className="text-sm text-gray-500">
          {itemCount} items processed
        </span>
      </div>
    );
  };
  
  export default ResultsHeader;