// src/services/projectService.js
import api from './api';

// Fetch a project by its ID
export const fetchProjectById = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch project.');
  }
};

// Upload a new sample to a project
export const uploadSample = async (projectId, sampleData) => {
  try {
    const response = await api.post(`/projects/${projectId}/samples`, sampleData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload sample.');
  }
};

// Additional project-related services can be added here
