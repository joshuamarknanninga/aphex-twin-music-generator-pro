// src/contexts/ProjectContext.jsx
import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);

  const addProject = (project) => {
    setProjects([...projects, project]);
  };

  const addSample = (sample) => {
    setCurrentProject((prev) => ({
      ...prev,
      samples: [...prev.samples, sample],
    }));
  };

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        setCurrentProject,
        projects,
        setProjects,
        addProject,
        addSample,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
