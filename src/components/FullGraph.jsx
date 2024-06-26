import React, { useEffect, useState } from 'react';
import Graph from 'graphology';
import {
  SigmaContainer,
  useRegisterEvents,
  useLoadGraph,
  useSigma,
} from '@react-sigma/core';
import dagre from 'dagre';
import '@react-sigma/core/lib/react-sigma.min.css';
import { parse_gos_to_full_graph } from '../helper/utils'

const GraphEvents = () => {
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();
  const [draggedNode, setDraggedNode] = useState(null);

  useEffect(() => {
    // Register the events
    registerEvents({
      downNode: (e) => {
        setDraggedNode(e.node);
        sigma.getGraph().setNodeAttribute(e.node, 'highlighted', true);
      },
      // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
      mousemovebody: (e) => {
        if (!draggedNode) return;
        // Get new position of node
        const pos = sigma.viewportToGraph(e);
        sigma.getGraph().setNodeAttribute(draggedNode, 'x', pos.x);
        sigma.getGraph().setNodeAttribute(draggedNode, 'y', pos.y);

        // Prevent sigma to move camera:
        e.preventSigmaDefault();
        e.original.preventDefault();
        e.original.stopPropagation();
      },
      // On mouse up, we reset the autoscale and the dragging mode
      mouseup: () => {
        if (draggedNode) {
          setDraggedNode(null);
          sigma.getGraph().removeNodeAttribute(draggedNode, 'highlighted');
        }
      },
      // Disable the autoscale at the first down interaction
      mousedown: () => {
        if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
      },
    });
  }, [registerEvents, sigma, draggedNode]);

  return null;
};

const type2color = {
  'barrier': '#FA4F40',
  'run': '#FABF40',
  'move': '#FABF40',
  'lock': '#97fa40',
  'unlock': '#40fab9',
}

const createGraph = (data) => {
  const graph = new Graph();
  data.nodes.forEach(e => {
    let color = type2color[e.type]
    if (e.name === 'Start') {
      color = '#1c62fb'
    }
    else if (e.name === 'End') {
      color = '#0f266c'
    }
    graph.addNode(e.name, {
      size: 8,
      label: e.display,
      color: color,
    });
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

const UseGraph = ({ content }) => {
  const loadGraph = useLoadGraph(); // Ensuring useLoadGraph is within SigmaContainer
  React.useEffect(() => {
    if (!content) return;
    const { graph } = parse_gos_to_full_graph(content);
    loadGraph(createGraph(graph));
  }, [content])
  return null;
};

export const DisplayFullGraph = ({ content, dimension }) => {
  const [width, height] = dimension;
  const sigmaStyle = { height: height, width: width, backgroundColor: '#837c7c' };
  return (
    <SigmaContainer style={sigmaStyle}>
      <GraphEvents />
      <UseGraph content={content} />
    </SigmaContainer>
  );
};
