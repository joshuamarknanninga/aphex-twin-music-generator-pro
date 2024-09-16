import React, { useState } from 'react';

const SampleLoader = ({ loadSample }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleLoadSample = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        loadSample(e.target.result);
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded mt-4">
      <h2 className="text-2xl mb-2">Sample Loader</h2>
      <input type="file" accept="audio/*" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleLoadSample}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Load Sample
      </button>
    </div>
  );
};

export default SampleLoader;
