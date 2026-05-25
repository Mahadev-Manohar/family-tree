import Link from "next/link";

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
    <div className="relative h-screen w-full">
      {/* HEADER */}
      <div
        className="
          absolute
          top-0
          left-0
          right-0
          z-20
          flex
          items-center
          justify-between
          px-8
          py-5
          pointer-events-none
        "
      >
        <div className="pointer-events-auto">
          <h1
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            Family Tree
          </h1>

          <p
            className="
              text-sm
              text-zinc-400
            "
          >
            Family hierarchy
          </p>
        </div>

        <Link
          href="/admin/login"
          className="
            pointer-events-auto
            rounded-xl
            border
            border-zinc-700
            bg-zinc-900/90
            px-5
            py-2.5
            text-sm
            font-medium
            text-zinc-200
            backdrop-blur-md
            transition
            hover:border-zinc-500
            hover:bg-zinc-800
          "
        >
          Admin Login
        </Link>
      </div>

      <FamilyTreeFlow
        nodes={nodes}
        edges={edges}
      />
    </div>
  );
}