import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import ReactFlow, { MiniMap, Controls as FlowControls } from 'reactflow';
import 'reactflow/dist/style.css';

const ModularSynthInterface = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [audioNodes, setAudioNodes] = useState({});

  useEffect(() => {
    // Initialize default nodes and audio nodes
    const defaultNodes = [
      {
        id: '1',
        type: 'oscillatorNode',
        position: { x: 100, y: 100 },
        data: { label: 'Oscillator' },
      },
      {
        id: '2',
        type: 'outputNode',
        position: { x: 400, y: 100 },
        data: { label: 'Output' },
      },
    ];

    setNodes(defaultNodes);

    const osc = new Tone.Oscillator().start();
    setAudioNodes({
      '1': osc,
      '2': Tone.Destination,
    });

    return () => {
      osc.dispose();
    };
  }, []);

  const onConnect = (params) => {
    setEdges((eds) => [...eds, params]);
    // Connect audio nodes
    const sourceNode = audioNodes[params.source];
    const targetNode = audioNodes[params.target];
    if (sourceNode && targetNode) {
      sourceNode.connect(targetNode);
    }
  };

  const nodeTypes = {
    oscillatorNode: OscillatorNodeComponent,
    outputNode: OutputNodeComponent,
    // Add more node types as needed
  };

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        fitView
      >
        <MiniMap />
        <FlowControls />
      </ReactFlow>
    </div>
  );
};

const OscillatorNodeComponent = ({ id, data }) => {
  const [type, setType] = useState('sine');
  const audioNode = new Tone.Oscillator({ type }).start();

  useEffect(() => {
    audioNode.type = type;
    return () => {
      audioNode.dispose();
    };
  }, [type]);

  return (
    <div style={{ padding: 10, backgroundColor: '#1e1e1e', color: 'white' }}>
      <div>{data.label}</div>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
    </div>
  );
};

const OutputNodeComponent = ({ data }) => {
  return (
    <div style={{ padding: 10, backgroundColor: '#1e1e1e', color: 'white' }}>
      <div>{data.label}</div>
    </div>
  );
};

export default ModularSynthInterface;
