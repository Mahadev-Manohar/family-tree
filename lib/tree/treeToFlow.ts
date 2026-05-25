import dagre from "dagre";

import {
  Edge,
  Node,
} from "reactflow";

import { TreeNode }
  from "@/types/tree";

type FlowResult = {
  nodes: Node[];
  edges: Edge[];
};

const dagreGraph =
  new dagre.graphlib.Graph();

dagreGraph.setDefaultEdgeLabel(
  () => ({})
);

const NODE_WIDTH = 380;
const NODE_HEIGHT = 170;

export function treeToFlow(
  tree: TreeNode
): FlowResult {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  function traverse(
    node: TreeNode
  ) {
    nodes.push({
      id: node.id,

      data: {
        fullName:
            node.fullName,

        gender:
            node.gender,

        isAlive:
            node.isAlive,

        birthDisplay:
            node.birthDisplay,

        profileImageUrl:
          node.profileImageUrl,

        spouse:
            node.spouse,
        },

      type: "personNode",

      position: {
        x: 0,
        y: 0,
      },
    });

    dagreGraph.setNode(
      node.id,
      {
        width:
          NODE_WIDTH,

        height:
          NODE_HEIGHT,
      }
    );

    node.children.forEach(
      (child) => {
        edges.push({
          id:
            `${node.id}-${child.id}`,

          source:
            node.id,

          target:
            child.id,

          type: "step",

          animated: false,

          style: {
            stroke:
              "#6b7280",
            strokeWidth:
              2,
          },
        });

        dagreGraph.setEdge(
          node.id,
          child.id
        );

        traverse(child);
      }
    );
  }

  traverse(tree);

  dagreGraph.setGraph({
    rankdir: "TB",
    ranksep: 220,
    nodesep: 180,
    marginx: 40,
    marginy: 40,
  });

  dagre.layout(
    dagreGraph
  );

  const layoutedNodes =
    nodes.map((node) => {
      const position =
        dagreGraph.node(
          node.id
        );

      return {
        ...node,

        position: {
          x:
            position.x -
            NODE_WIDTH /
              2,

          y:
            position.y -
            NODE_HEIGHT /
              2,
        },
      };
    });

  return {
    nodes:
      layoutedNodes,

    edges,
  };
}