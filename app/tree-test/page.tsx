import { prisma } from "@/lib/db/prisma";
import { buildTree } from "@/lib/tree/buildTree";

export default async function TreeTestPage() {
  const people =
    await prisma.person.findMany({
      where: {
        isDeleted: false,
      },
    });

  const tree =
    buildTree(people);

  return (
    <pre
      className="
        p-8
        text-sm
        overflow-auto
      "
    >
      {JSON.stringify(
        tree,
        null,
        2
      )}
    </pre>
  );
}