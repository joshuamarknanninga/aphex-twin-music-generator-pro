// src/pages/Dashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, List, Button, Segment } from 'semantic-ui-react';
import { ProjectContext } from '../contexts/ProjectContext';
import { Link } from 'react-router-dom';
import { createProject, fetchProjects } from '../services/projectService';

const Dashboard = () => {
  const { currentProject, projects, setProjects, addProject } = useContext(ProjectContext);
  const [newProjectName, setNewProjectName] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      const fetchedProjects = await fetchProjects();
      setProjects(fetchedProjects);
    };
    loadProjects();
  }, [setProjects]);

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    setCreating(true);
    try {
      const project = await createProject(newProjectName);
      addProject(project);
      setNewProjectName('');
    } catch (error) {
      console.error(error);
    }
    setCreating(false);
  };

  return (
    <Container className="mt-10">
      <Header as="h2">Your Projects</Header>
      <Segment>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="New Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="p-2 rounded mr-2 flex-grow text-black"
          />
          <Button onClick={handleCreateProject} primary loading={creating}>
            Create
          </Button>
        </div>
      </Segment>
      <List divided relaxed>
        {projects.map((project) => (
          <List.Item key={project.id}>
            <List.Content floated="right">
              <Button as={Link} to={`/project/${project.id}`} color="blue">
                Open
              </Button>
            </List.Content>
            <List.Content>
              <List.Header>{project.name}</List.Header>
              <List.Description>
                Created on: {new Date(project.createdAt).toLocaleDateString()}
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Container>
  );
};

export default Dashboard;
