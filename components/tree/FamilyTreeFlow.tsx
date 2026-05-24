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
      "
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}