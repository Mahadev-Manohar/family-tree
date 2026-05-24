import { Edge, Node }
  from "reactflow";

import { TreeNode }
  from "@/types/tree";

type FlowResult = {
  nodes: Node[];
  edges: Edge[];
};

export function treeToFlow(
  tree: TreeNode
): FlowResult {
  const nodes: Node[] = [];

  const edges: Edge[] = [];

  function traverse(
    node: TreeNode,
    x = 0,
    y = 0
  ) {
    nodes.push({
      id: node.id,

      position: {
        x,
        y,
      },

      data: {
        label:
          node.fullName,
      },

      type: "default",
    });

    node.children.forEach(
      (
        child,
        index
      ) => {
        const childX =
          x +
          index * 250 -
          (
            node.children
              .length -
            1
          ) *
            125;

        const childY =
          y + 180;

        edges.push({
          id: `${node.id}-${child.id}`,

          source:
            node.id,

          target:
            child.id,
        });

        traverse(
          child,
          childX,
          childY
        );
      }
    );
  }

  traverse(tree);

  return {
    nodes,
    edges,
  };
}