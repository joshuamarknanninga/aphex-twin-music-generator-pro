// src/components/SampleLoader/SampleLoader.jsx
import React, { useState, useContext } from 'react';
import { Header, Input, Button, List, Message } from 'semantic-ui-react';
import { ProjectContext } from '../../contexts/ProjectContext';
import { uploadSample } from '../../services/projectService';

const SampleLoader = () => {
  const { currentProject, addSample } = useContext(ProjectContext);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setUploading(true);
    try {
      const sampleData = await uploadSample(currentProject.id, file);
      addSample(sampleData);
      setFile(null);
    } catch (err) {
      setError(err.message || 'Failed to upload sample.');
    }
    setUploading(false);
  };

  return (
    <div className="p-4 bg-gray-800 text-white">
      <Header as="h3">Sample Loader</Header>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} primary loading={uploading} className="ml-2">
        Upload
      </Button>
      {error && <Message error content={error} />}
      <List divided relaxed className="mt-4">
        {currentProject.samples.map((sample) => (
          <List.Item key={sample.id}>
            <List.Content>
              <List.Header>{sample.name}</List.Header>
              <audio controls src={sample.url} className="mt-2 w-full" />
            </List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default SampleLoader;
