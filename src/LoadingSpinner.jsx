
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      <span className="text-gray-500 text-xl">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
