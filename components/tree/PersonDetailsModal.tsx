"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";

type Person = {
  id: string;
  fullName: string;
  gender: string;
  profileImageUrl?: string | null;
  birthDisplay?: string | null;
  deathDisplay?: string | null;
  bio?: string | null;
  isAlive: boolean;
  spouse?: { fullName: string } | null;
  children?: { id: string; fullName: string }[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  person: Person | null;
};

export default function PersonDetailsModal({
  open,
  onClose,
  person,
}: Props) {
  if (!person) return null;

  const initials = person.fullName
    .split(" ")
    .map((name) => name[0])
    .slice(0, 2)
    .join("");

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[min(95vw,42rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl sm:p-5">
          <div className="mb-5 flex flex-col items-center gap-3 text-center sm:flex-row sm:gap-5 sm:text-left">
            {person.profileImageUrl ? (
              <img
                src={person.profileImageUrl}
                alt={person.fullName}
                className="size-20 rounded-full border-4 border-zinc-800 object-cover shadow-xl"
              />
            ) : (
              <div className="grid size-20 place-items-center rounded-full bg-zinc-800 text-2xl font-bold text-white">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <Dialog.Title className="text-2xl font-bold text-white">
                {person.fullName}
              </Dialog.Title>
              <p className="mt-1 text-sm text-zinc-400">
                {person.gender}
              </p>
              <span
                className={
                  person.isAlive
                    ? "mt-2 inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400"
                    : "mt-2 inline-flex rounded-full bg-red-500/15 px-3 py-1 text-xs font-medium text-red-400"
                }
              >
                {person.isAlive ? "Living" : "Deceased"}
              </span>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <InfoCard label="Birth" value={person.birthDisplay ?? "Unknown"} />
            <InfoCard label="Death" value={person.deathDisplay ?? "—"} />
            <InfoCard label="Gender" value={person.gender} />
            <InfoCard label="Spouse" value={person.spouse?.fullName ?? "None"} />
          </div>

          <section className="mb-4">
            <h3 className="mb-2 text-xs uppercase text-zinc-400">
              Biography
            </h3>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
              <p className="whitespace-pre-wrap break-words text-sm leading-5 text-zinc-200">
                {person.bio ?? "No biography available"}
              </p>
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-xs uppercase text-zinc-400">
              Children
            </h3>
            {person.children?.length ? (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {person.children.map((child) => (
                  <div
                    key={child.id}
                    className="break-words rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm text-zinc-200"
                  >
                    {child.fullName}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 text-sm text-zinc-400">
                No children
              </div>
            )}
          </section>

          <div className="mt-4 flex gap-3">
            <Link
              href={`/admin/persons/${person.id}/edit`}
              className="flex min-h-10 flex-1 items-center justify-center rounded-lg bg-blue-600 px-4 text-center text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              Edit Person
            </Link>
            <Dialog.Close className="min-h-10 flex-1 rounded-lg bg-zinc-800 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
      <p className="mb-1 text-xs text-zinc-500">{label}</p>
      <p className="break-words text-sm font-medium text-white">
        {value}
      </p>
    </div>
  );
}