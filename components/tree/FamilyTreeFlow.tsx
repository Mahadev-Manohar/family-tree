"use client";

import ReactFlow, {
  Background,
  Controls,
} from "reactflow";

import "reactflow/dist/style.css";

import {
  Node,
  Edge,
} from "reactflow";

import PersonNode
  from "./PersonNode";

const nodeTypes = {
  personNode:
    PersonNode,
};

type Props = {
  nodes: Node[];
  edges: Edge[];
};

export default function FamilyTreeFlow({
  nodes,
  edges,
}: Props) {
  return (
    <div
      className="
        w-full
        h-screen
        bg-black
      "
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
            padding: 0.6,
        }}
        nodesDraggable={true}
        panOnDrag
        zoomOnScroll
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{
            style: {
            stroke: "#6b7280",
            strokeWidth: 2,
            },
        }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}