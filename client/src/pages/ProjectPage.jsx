// src/pages/ProjectPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../contexts/ProjectContext';
import { fetchProjectById } from '../services/projectService';
import ModularSynth from '../components/Synthesizer/ModularSynth';
import EffectsRack from '../components/Effects/EffectsRack';
import StepSequencer from '../components/Sequencer/StepSequencer';
import Player from '../components/Player/Player';
import SampleLoader from '../components/SampleLoader/SampleLoader';
import Settings from '../components/Settings/Settings';
import { Container, Header, Loader, Message } from 'semantic-ui-react';

const ProjectPage = () => {
  const { id } = useParams();
  const { currentProject, setCurrentProject, addSample } = useContext(ProjectContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      try {
        const project = await fetchProjectById(id);
        setCurrentProject(project);
      } catch (err) {
        setError('Failed to load project.');
      }
      setLoading(false);
    };
    loadProject();
  }, [id, setCurrentProject]);

  if (loading) return <Loader active inline="centered" />;

  if (error) return <Message error content={error} />;

  return (
    <Container className="mt-10">
      <Header as="h2">{currentProject.name}</Header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <ModularSynth />
          <EffectsRack />
          <StepSequencer />
          <Player />
        </div>
        <div>
          <SampleLoader />
          <Settings />
        </div>
      </div>
    </Container>
  );
};

export default ProjectPage;
