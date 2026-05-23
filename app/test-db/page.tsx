import { prisma } from "@/lib/db/prisma";

export default async function TestDBPage() {
  const people = await prisma.person.findMany();

  return (
    <main>
      <h1>Database Connected</h1>

      <pre>{JSON.stringify(people, null, 2)}</pre>
    </main>
  );
}