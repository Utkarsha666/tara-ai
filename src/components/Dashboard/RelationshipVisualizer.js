// components/Dashboard/RelationshipVisualizer.js
import React from "react";
import ReactFlow, { Controls } from "react-flow-renderer";

const generateGridPositions = (existingNodes) => {
  const positions = [];
  const cols = Math.ceil(Math.sqrt(existingNodes.length));
  const rows = Math.ceil(existingNodes.length / cols);

  for (let i = 0; i < existingNodes.length; i++) {
    positions.push({
      id: existingNodes[i],
      position: {
        x: (i % cols) * 100,
        y: Math.floor(i / cols) * 100,
      },
    });
  }

  return positions;
};

const colorPalette = ["#FF6347", "#8884d8", "#82ca9d", "#FFD700", "#FF69B4"];

const getColorForEdge = (source, target) => {
  const index =
    Math.abs(source.charCodeAt(0) + target.charCodeAt(0)) % colorPalette.length;
  return colorPalette[index];
};

const RelationshipVisualizer = ({ nodes, edges }) => {
  // Map nodes to ReactFlow format
  const flowNodes = generateGridPositions(nodes).map(({ id, position }) => ({
    id,
    data: { label: id },
    position,
    style: {
      border: "1px solid #777",
      borderRadius: "50%",
      background: "#fff",
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }));

  const flowEdges = edges.map((edge) => ({
    id: `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    type: "smoothstep",
    animated: true,
    arrowHeadType: "arrow",
    style: { stroke: getColorForEdge(edge.source, edge.target) },
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        zIndex: 0,
      }}
    >
      <ReactFlow nodes={flowNodes} edges={flowEdges} fitView>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default RelationshipVisualizer;
