"use client";

import {
  useState,
} from "react";

import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
} from "reactflow";

import "reactflow/dist/style.css";

import PersonNode
  from "./PersonNode";

import PersonDetailsModal
  from "./PersonDetailsModal";

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
  const [
    selectedPerson,
    setSelectedPerson,
  ] = useState<any>(
    null
  );

  const [
    open,
    setOpen,
  ] = useState(false);

  async function handleNodeClick(
    personId: string
  ) {
    const res =
      await fetch(
        `/api/admin/persons/${personId}`
      );

    const person =
      await res.json();

    setSelectedPerson(
      person
    );

    setOpen(true);
  }

  const updatedNodes =
  nodes.map((node) => ({
    ...node,

    data: {
      ...node.data,

      onPersonClick:
        handleNodeClick,
    },
  }));

  return (
    <>
      <div
        className="
          w-full
          h-screen
          bg-black
        "
      >
        <ReactFlow
          nodes={updatedNodes}
          edges={edges}
          nodeTypes={
            nodeTypes
          }
          fitView

          fitViewOptions={{
            padding: 0.6,
          }}
          minZoom={0.3}
          maxZoom={2}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <PersonDetailsModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        person={
          selectedPerson
        }
      />
    </>
  );
}