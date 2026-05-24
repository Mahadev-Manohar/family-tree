"use client";

import * as Dialog from
  "@radix-ui/react-dialog";

type Person = {
  id: string;
  fullName: string;
  gender: string;
  birthDisplay?: string | null;
  deathDisplay?: string | null;
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
            bg-black/70
            backdrop-blur-sm
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
            max-w-xl
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-950
            p-6
            shadow-2xl
            z-50
          "
        >
          <Dialog.Title
            className="
              text-2xl
              font-bold
              text-white
              mb-5
            "
          >
            {person.fullName}
          </Dialog.Title>

          <div className="space-y-4">
            <InfoRow
              label="Gender"
              value={person.gender}
            />

            <InfoRow
              label="Birth"
              value={
                person.birthDisplay ??
                "Unknown"
              }
            />

            <InfoRow
              label="Death"
              value={
                person.deathDisplay ??
                "—"
              }
            />

            <InfoRow
              label="Status"
              value={
                person.isAlive
                  ? "Living"
                  : "Deceased"
              }
            />

            <InfoRow
              label="Spouse"
              value={
                person.spouse
                  ?.fullName ??
                "None"
              }
            />

            <div>
              <p
                className="
                  text-zinc-500
                  text-sm
                  mb-1
                "
              >
                Bio
              </p>

              <p
                className="
                  text-zinc-200
                "
              >
                {person.bio ??
                  "No biography available"}
              </p>
            </div>

            <div>
              <p
                className="
                  text-zinc-500
                  text-sm
                  mb-2
                "
              >
                Children
              </p>

              {person.children
                ?.length ? (
                <div className="space-y-2">
                  {person.children.map(
                    (child) => (
                      <div
                        key={
                          child.id
                        }
                        className="
                          rounded-lg
                          bg-zinc-900
                          p-2
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
                <p
                  className="
                    text-zinc-400
                  "
                >
                  No children
                </p>
              )}
            </div>
          </div>

          <Dialog.Close
            className="
              mt-6
              w-full
              rounded-xl
              bg-zinc-800
              py-3
              text-white
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

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p
        className="
          text-zinc-500
          text-sm
        "
      >
        {label}
      </p>

      <p
        className="
          text-zinc-200
        "
      >
        {value}
      </p>
    </div>
  );
}