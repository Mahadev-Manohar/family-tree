export const dynamic =
  "force-dynamic";

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
  try {
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
        <div
          className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-black
            text-white
          "
        >
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
                text-3xl
                font-bold
                leading-none
                text-white
              "
            >
              Family Tree
            </h1>

            <p
              className="
                mt-2
                text-sm
                font-medium
                text-zinc-400
              "
            >
              Family hierarchy
            </p>
          </div>

          <Link
            href="/admin/login"
            className="
              inline-flex
              items-center
              justify-center
              pointer-events-auto
              rounded-xl
              border
              border-cyan-200
              bg-cyan-300
              px-5
              py-3
              text-sm
              font-bold
              text-zinc-950
              shadow-lg
              shadow-black/30
              transition-colors
              duration-200
              hover:border-cyan-100
              hover:bg-cyan-200
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-cyan-300
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
  } catch (error) {
    console.error(error);

    return (
      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-black
          px-6
        "
      >
        <div
          className="
            w-full
            max-w-xl
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-950
            p-10
            text-center
            shadow-2xl
          "
        >
          <h1
            className="
              text-3xl
              font-bold
              text-white
              mb-3
            "
          >
            Unable to load
            family tree
          </h1>

          <p
            className="
              text-zinc-400
              text-lg
            "
          >
            Unable to connect
            to the family
            database.
          </p>

          <p
            className="
              text-zinc-500
              mt-2
              mb-8
            "
          >
            Please check your
            internet connection
            and try again.
          </p>

          <Link
            href="/admin/login"
            className="
              inline-flex
              items-center
              justify-center
              rounded-2xl
              bg-white
              px-6
              py-3
              text-black
              font-semibold
              hover:bg-zinc-200
              transition
            "
          >
            Admin Login
          </Link>
        </div>
      </main>
    );
  }
}