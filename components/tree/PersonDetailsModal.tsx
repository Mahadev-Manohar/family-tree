"use client";

import * as Dialog from
  "@radix-ui/react-dialog";

type Person = {
  id: string;
  fullName: string;
  gender: string;

  profileImageUrl?:
    | string
    | null;

  birthDisplay?:
    | string
    | null;

  deathDisplay?:
    | string
    | null;

  bio?: string | null;

  isAlive: boolean;

  spouse?: {
    fullName: string;
  } | null;

  children?: {
    id: string;
    fullName: string;
  }[];
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

  const initials =
    person.fullName
      .split(" ")
      .map(
        (name) => name[0]
      )
      .slice(0, 2)
      .join("");

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            fixed
            inset-0
            bg-black/80
            backdrop-blur-md
            z-50
          "
        />

        <Dialog.Content
          className="
            fixed
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[95vw]
            max-w-3xl
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-950
            p-8
            shadow-2xl
            z-50
          "
        >
          {/* HEADER */}
          <div
            className="
              flex
              flex-col
              items-center
              text-center
              mb-10
            "
          >
            {person.profileImageUrl ? (
              <img
                src={
                  person.profileImageUrl
                }
                alt={
                  person.fullName
                }
                className="
                  w-36
                  h-36
                  rounded-full
                  object-cover
                  border-4
                  border-zinc-800
                  shadow-xl
                "
              />
            ) : (
              <div
                className="
                  w-36
                  h-36
                  rounded-full
                  bg-zinc-800
                  flex
                  items-center
                  justify-center
                  text-4xl
                  font-bold
                  text-white
                "
              >
                {initials}
              </div>
            )}

            <Dialog.Title
              className="
                mt-6
                text-4xl
                font-bold
                text-white
              "
            >
              {person.fullName}
            </Dialog.Title>

            <p
              className="
                mt-2
                text-zinc-400
                text-lg
              "
            >
              {person.gender}
            </p>

            <span
              className={`
                mt-4
                rounded-full
                px-4
                py-2
                text-sm
                font-medium
                ${
                  person.isAlive
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-red-500/15 text-red-400"
                }
              `}
            >
              {person.isAlive
                ? "Living"
                : "Deceased"}
            </span>
          </div>

          {/* DETAILS */}
          <div
            className="
              grid
              grid-cols-2
              gap-6
              mb-8
            "
          >
            <InfoCard
              label="Birth"
              value={
                person.birthDisplay ??
                "Unknown"
              }
            />

            <InfoCard
              label="Death"
              value={
                person.deathDisplay ??
                "—"
              }
            />

            <InfoCard
              label="Gender"
              value={
                person.gender
              }
            />

            <InfoCard
              label="Spouse"
              value={
                person.spouse
                  ?.fullName ??
                "None"
              }
            />
          </div>

          {/* BIO */}
          <div className="mb-8">
            <h3
              className="
                text-zinc-400
                text-sm
                uppercase
                tracking-wide
                mb-3
              "
            >
              Biography
            </h3>

            <div
              className="
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900/40
                p-5
              "
            >
              <p
                className="
                  text-zinc-200
                  leading-7
                "
              >
                {person.bio ??
                  "No biography available"}
              </p>
            </div>
          </div>

          {/* CHILDREN */}
          <div>
            <h3
              className="
                text-zinc-400
                text-sm
                uppercase
                tracking-wide
                mb-3
              "
            >
              Children
            </h3>

            {person.children
              ?.length ? (
              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                "
              >
                {person.children.map(
                  (child) => (
                    <div
                      key={
                        child.id
                      }
                      className="
                        rounded-2xl
                        border
                        border-zinc-800
                        bg-zinc-900/40
                        px-4
                        py-3
                        text-zinc-200
                      "
                    >
                      {
                        child.fullName
                      }
                    </div>
                  )
                )}
              </div>
            ) : (
              <div
                className="
                  rounded-2xl
                  border
                  border-zinc-800
                  bg-zinc-900/40
                  p-5
                  text-zinc-400
                "
              >
                No children
              </div>
            )}
          </div>

          <Dialog.Close
            className="
              mt-10
              w-full
              rounded-2xl
              bg-zinc-800
              py-4
              text-white
              font-medium
              transition
              hover:bg-zinc-700
            "
          >
            Close
          </Dialog.Close>
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
    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/40
        p-5
      "
    >
      <p
        className="
          text-zinc-500
          text-sm
          mb-2
        "
      >
        {label}
      </p>

      <p
        className="
          text-white
          font-medium
          text-lg
        "
      >
        {value}
      </p>
    </div>
  );
}