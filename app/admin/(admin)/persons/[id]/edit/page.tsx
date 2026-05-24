import PersonForm from "@/components/admin/PersonForm";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPersonPage({
  params,
}: Props) {
  const { id } = await params;

  const person =
    await prisma.person.findUnique({
      where: {
        id,
      },
    });

  if (!person) {
    notFound();
  }

  const people =
    await prisma.person.findMany({
      where: {
        isDeleted: false,
        id: {
          not: id,
        },
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
        Edit Person
      </h1>

      <PersonForm
        initialData={person}
        people={personOptions}
      />
    </div>
  );
}