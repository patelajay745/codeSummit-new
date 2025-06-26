import React from "react";

const RunningCodeSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-4 bg-gray-800/50 rounded w-3/4"></div>
        <div className="h-4 bg-gray-800/50 rounded w-1/2"></div>
        <div className="h-4 bg-gray-800/50 rounded w-5/6"></div>
      </div>
      <div className="space-y-2 pt-4">
        <div className="h-4 bg-gray-800/50 rounded w-2/3"></div>
        <div className="h-4 bg-gray-800/50 rounded w-4/5"></div>
        <div className="h-4 bg-gray-800/50 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default RunningCodeSkeleton;
