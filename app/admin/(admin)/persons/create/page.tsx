import PersonForm from "@/components/admin/PersonForm";
import { prisma } from "@/lib/db/prisma";

export default async function CreatePersonPage() {
  const people =
    await prisma.person.findMany({
      where: {
        isDeleted: false,
      },

      orderBy: {
        fullName: "asc",
      },
    });

  const personOptions =
    people.map((person) => ({
      value: person.id,

      label:
        person.birthDisplay
          ? `${person.fullName} (${person.birthDisplay})`
          : person.fullName,
    }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Add Person
      </h1>

      <PersonForm
        people={personOptions}
      />
    </div>
  );
}

// import PersonForm from "@/components/admin/PersonForm";

// export default function CreatePersonPage() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-8">
//         Add Person
//       </h1>

//       <PersonForm />
//     </div>
//   );
// }