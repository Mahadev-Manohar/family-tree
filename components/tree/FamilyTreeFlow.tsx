"use client";

import {
  useMemo,
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

  const personMap =
    useMemo(() => {
      const map =
        new Map();

      function addPerson(
        person: any
      ) {
        if (!person) return;

        map.set(
          person.id,
          person
        );

        if (
          person.spouse
        ) {
          map.set(
            person.spouse.id,
            person.spouse
          );
        }

        if (
          person.children
        ) {
          person.children.forEach(
            addPerson
          );
        }
      }

      nodes.forEach(
        (node) =>
          addPerson(
            node.data
          )
      );

      return map;
    }, [nodes]);

  function handleNodeClick(
    personId: string
  ) {
    const person =
      personMap.get(
        personId
      );

    if (!person) return;

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
            padding: 0.35,
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