
import React, { useRef } from 'react';
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import dagre from "dagre";
import "@react-sigma/core/lib/react-sigma.min.css";

const sigmaStyle = { height: "700px", width: "1000px" };

const d = { 
  nodes: [
    {name: 'Start', barrier: true},
    {name: 'tecan_loaded', barrier: true},
    {name: 'vspin_1', barrier: false},
    {name: 'vspin_2', barrier: false},
    {name: 'after_run', barrier: true},
    {name: 'tecan_unload', barrier: true},
    {name: 'End', barrier: true},
  ],
  edges: [
    ['Start', 'tecan_loaded'],
    ['tecan_loaded', 'after_run'],
    ['after_run', 'End'],
    ['tecan_loaded', 'vspin_1'],
    ['vspin_1', 'vspin_2'],
    ['vspin_2', 'tecan_unload'],
    ['tecan_unload', 'End'],
  ]
};

const createGraph = (data) => {
  const graph = new Graph();
  data.nodes.forEach(e => {
    let color = e.barrier? "#FA4F40": "#FABF40";
    if (e.name === 'Start') {
      color = "#407bfa"
    }
    else if (e.name === 'End') {
      color = "#0f266c"
    }
    graph.addNode(e.name, {size: 15, label: e.name, color: color});
  })
  data.edges.forEach(e => graph.addEdge(e[0], e[1]))

  // Set up the dagre graph
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: 'LR' }); // LR = Left to Right
  g.setDefaultEdgeLabel(() => ({}));

  // Add nodes to the dagre graph
  graph.forEachNode((node, attributes) => {
    g.setNode(node, { width: 50, height: 50 });
  });

  // Add edges to the dagre graph
  graph.forEachEdge((edge, attributes, source, target) => {
    g.setEdge(source, target);
  });

  // Apply Dagre layout
  dagre.layout(g);

  // Update graphology graph with new positions
  g.nodes().forEach(node => {
    const { x, y } = g.node(node);
    graph.setNodeAttribute(node, 'x', x);
    graph.setNodeAttribute(node, 'y', y);
  });
  return graph;
}

const readFile = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = JSON.parse(e.target.result);
  };
  reader.readAsText(file);
}

const FileInputComponent = ({ fileInputRef, handleFileInput }) => {
  const loadGraph = useLoadGraph(); // Ensuring useLoadGraph is within SigmaContainer
  const load = (data, loadGraph) => { loadGraph(createGraph(d)); };
  return (
    <input type="file" onChange={(e) => load(e, loadGraph)} ref={fileInputRef} />
  );
};

export const DisplayGraph = () => {
  const fileInputRef = useRef(null);
  return (
    <SigmaContainer style={sigmaStyle}>
      <FileInputComponent fileInputRef={fileInputRef} />
    </SigmaContainer>
  );
};
