export const dynamic = "force-dynamic";

import Link from "next/link";

import { prisma } from "@/lib/db/prisma";

export default async function DashboardPage() {
  const [
    totalPeople,
    livingPeople,
    deceasedPeople,
    rootAncestors,
    recentPeople,
  ] = await Promise.all([
    prisma.person.count({
      where: { isDeleted: false },
    }),
    prisma.person.count({
      where: {
        isDeleted: false,
        isAlive: true,
      },
    }),
    prisma.person.count({
      where: {
        isDeleted: false,
        isAlive: false,
      },
    }),
    prisma.person.count({
      where: {
        isDeleted: false,
        isRootAncestor: true,
      },
    }),
    prisma.person.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        fullName: true,
        isAlive: true,
        createdAt: true,
      },
    }),
  ]);

  const stats = [
    { label: "Active people", value: totalPeople },
    { label: "Living", value: livingPeople },
    { label: "Deceased", value: deceasedPeople },
    { label: "Root ancestors", value: rootAncestors },
  ];

  return (
    <main className="max-w-6xl">
      <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-cyan-300">
            Family records
          </p>
          <h1 className="text-3xl font-bold text-white">
            Admin Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
            A current overview of the people and roots in your family tree.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/persons"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-700 px-4 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            View people
          </Link>
          <Link
            href="/admin/persons/create"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-cyan-200 bg-cyan-300 px-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            Add person
          </Link>
        </div>
      </header>

      <section
        aria-label="Family statistics"
        className="grid grid-cols-2 border-y border-zinc-800 sm:grid-cols-4 sm:divide-x sm:divide-zinc-800"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="py-5 pr-4 sm:px-5 first:pl-0 last:pr-0"
          >
            <p className="text-xs font-medium text-zinc-500">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Recent additions
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              The latest people added to the family tree.
            </p>
          </div>
          <Link
            href="/admin/persons"
            className="shrink-0 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          >
            View all
          </Link>
        </div>

        {recentPeople.length > 0 ? (
          <ol className="mt-5 divide-y divide-zinc-800 border-y border-zinc-800">
            {recentPeople.map((person) => (
              <li key={person.id}>
                <Link
                  href={`/admin/persons/${person.id}/edit`}
                  className="flex min-h-16 items-center justify-between gap-4 py-3 transition-colors hover:bg-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-cyan-300"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-100">
                      {person.fullName}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Added {person.createdAt.toLocaleDateString("en", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={
                      person.isAlive
                        ? "shrink-0 text-xs font-medium text-emerald-400"
                        : "shrink-0 text-xs font-medium text-zinc-500"
                    }
                  >
                    {person.isAlive ? "Living" : "Deceased"}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-5 border-y border-zinc-800 py-8">
            <p className="text-sm text-zinc-400">
              No people have been added yet.
            </p>
            <Link
              href="/admin/persons/create"
              className="mt-3 inline-flex text-sm font-medium text-cyan-300 hover:text-cyan-200"
            >
              Add the first person
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}