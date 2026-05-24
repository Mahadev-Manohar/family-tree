import { prisma }
  from "@/lib/db/prisma";

import { buildTree }
  from "@/lib/tree/buildTree";

import { treeToFlow }
  from "@/lib/tree/treeToFlow";

import FamilyTreeFlow
  from "@/components/tree/FamilyTreeFlow";

export default async function TreePage() {
  const people =
    await prisma.person.findMany({
      where: {
        isDeleted: false,
      },
    });

  const tree =
    buildTree(people);

  if (!tree) {
    return (
      <div className="p-8">
        No root ancestor found
      </div>
    );
  }

  const {
    nodes,
    edges,
  } = treeToFlow(tree);

  return (
    <FamilyTreeFlow
      nodes={nodes}
      edges={edges}
    />
  );
}