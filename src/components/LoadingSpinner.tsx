
import React from "react";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
      <span className="ml-2">Processing...</span>
    </div>
  );
};
