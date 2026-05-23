import { prisma } from "@/lib/db/prisma";
import Link from "next/link";
import DeletePersonButton from "@/components/admin/DeletePersonButton";

export default async function PersonsPage() {
  const people =
    await prisma.person.findMany({
      where: {
        isDeleted: false,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div>
      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >
        <h1 className="text-3xl font-bold">
          People
        </h1>

        <Link
          href="/admin/persons/create"
          className="
            bg-white
            text-black
            px-4
            py-2
            rounded-lg
          "
        >
          Add Person
        </Link>
      </div>

      <div
        className="
          overflow-x-auto
          rounded-xl
          border
          border-zinc-800
        "
      >
        <table className="w-full">
          <thead
            className="
              bg-zinc-900
            "
          >
            <tr>
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Gender
              </th>

              <th className="p-4 text-left">
                Birth
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {people.map((person) => (
              <tr
                key={person.id}
                className="
                  border-t
                  border-zinc-800
                "
              >
                <td className="p-4">
                  {person.fullName}
                </td>

                <td className="p-4">
                  {person.gender}
                </td>

                <td className="p-4">
                  {person.birthDisplay ||
                    "-"}
                </td>

                <td className="p-4">
                  {person.isAlive
                    ? "Alive"
                    : "Deceased"}
                </td>

                <td className="p-4 flex gap-3">

                  <Link
                    href={`/admin/persons/${person.id}/edit`}
                    className="
                      bg-blue-600
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Edit
                  </Link>

                  <DeletePersonButton
                    id={person.id}
                  />
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {people.length === 0 && (
          <div className="p-8 text-center">
            No people found
          </div>
        )}
      </div>
    </div>
  );
}