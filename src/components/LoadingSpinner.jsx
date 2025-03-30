import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full xl:h-40 lg:h-28 md:h-24 h-16 xl:w-40 lg:w-28 md:w-24 w-16 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default LoadingSpinner;