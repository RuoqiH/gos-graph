
import React, { useRef } from 'react';
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import dagre from "dagre";
import "@react-sigma/core/lib/react-sigma.min.css";

const sigmaStyle = { height: "500px", width: "500px" };

const FileInputComponent = ({ fileInputRef, handleFileInput }) => {
  const loadGraph = useLoadGraph(); // Ensuring useLoadGraph is within SigmaContainer
  const createAndLoadGraph = (data, loadGraph) => {
    const graph = new Graph();
    graph.addNode("1", { size: 15, label: "1", color: "#FA4F40" });
    graph.addNode("2", { size: 15, label: "2", color: "#4F0FFA" });
    graph.addNode("3", { size: 15, label: "3", color: "#FABF40" });
    graph.addNode("4", { size: 15, label: "4", color: "#4FAFFA" });
    graph.addNode("5", { size: 15, label: "5", color: "#12345A" });
    graph.addNode("6", { size: 15, label: "6", color: "#12345A" });
    graph.addNode("7", { size: 15, label: "7", color: "#12345A" });
    graph.addEdge("1", "2");
    graph.addEdge("2", "3");
    graph.addEdge("3", "6");
    graph.addEdge("6", "7");
    graph.addEdge("7", "4");
    graph.addEdge("4", "5");
    graph.addEdge("3", "4");

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

    // Load the graph into Sigma
    loadGraph(graph);
  };
  return (
    <input type="file" onChange={(e) => createAndLoadGraph(e, loadGraph)} ref={fileInputRef} />
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
