// Loader.jsx
import React from "react";
const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
