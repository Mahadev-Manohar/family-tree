"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PersonFormProps = {
  initialData?: {
    id?: string;
    fullName: string;
    gender: string;
    birthDisplay?: string | null;
    deathDisplay?: string | null;
    bio?: string | null;
    isAlive: boolean;
    isRootAncestor: boolean;
  };
};

export default function PersonForm({
  initialData,
}: PersonFormProps) {

  const router = useRouter();

  const [fullName, setFullName] =
    useState(
      initialData?.fullName || ""
    );

  const [gender, setGender] =
    useState(
      initialData?.gender || "MALE"
    );

  const [birthDisplay, setBirthDisplay] =
    useState(
      initialData?.birthDisplay || ""
    );

  const [deathDisplay, setDeathDisplay] =
    useState(
      initialData?.deathDisplay || ""
    );

  const [bio, setBio] =
    useState(
      initialData?.bio || ""
    );

  const [isAlive, setIsAlive] =
    useState(
      initialData?.isAlive ?? true
    );

  const [isRootAncestor, setIsRootAncestor] =
    useState(
      initialData?.isRootAncestor || false
    );

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
        const response = await fetch(
        "/api/admin/persons",
        {
            method: "POST",

            headers: {
            "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
            fullName,
            gender,
            birthDisplay,
            deathDisplay,
            bio,
            isAlive,
            isRootAncestor,
            }),
        }
        );

        if (!response.ok) {
        throw new Error(
            "Failed to save person"
        );
        }

        router.push("/admin/persons");
        router.refresh();

        setFullName("");
        setGender("MALE");
        setBirthDisplay("");
        setDeathDisplay("");
        setBio("");
        setIsAlive(true);
        setIsRootAncestor(false);
      } catch (error) {
        console.error(error);

        alert(
        "Something went wrong"
        );
      }
    }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 max-w-2xl"
    >
      <div>
        <label className="block mb-2">
          Full Name
        </label>

        <input
          type="text"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          className="
            w-full
            p-3
            rounded-lg
            bg-zinc-900
          "
        />
      </div>

      <div>
        <label className="block mb-2">
          Gender
        </label>

        <select
          value={gender}
          onChange={(e) =>
            setGender(e.target.value)
          }
          className="
            w-full
            p-3
            rounded-lg
            bg-zinc-900
          "
        >
          <option value="MALE">
            Male
          </option>

          <option value="FEMALE">
            Female
          </option>

          <option value="OTHER">
            Other
          </option>
        </select>
      </div>

      <div>
        <label className="block mb-2">
          Birth Year / Date
        </label>

        <input
          type="text"
          placeholder="1940 or 1940-03"
          value={birthDisplay}
          onChange={(e) =>
            setBirthDisplay(
              e.target.value
            )
          }
          className="
            w-full
            p-3
            rounded-lg
            bg-zinc-900
          "
        />
      </div>

      <div>
        <label className="block mb-2">
          Death Year / Date
        </label>

        <input
          type="text"
          placeholder="2015"
          value={deathDisplay}
          onChange={(e) =>
            setDeathDisplay(
              e.target.value
            )
          }
          className="
            w-full
            p-3
            rounded-lg
            bg-zinc-900
          "
        />
      </div>

      <div>
        <label className="block mb-2">
          Bio
        </label>

        <textarea
          value={bio}
          onChange={(e) =>
            setBio(e.target.value)
          }
          rows={4}
          className="
            w-full
            p-3
            rounded-lg
            bg-zinc-900
          "
        />
      </div>

      <div className="flex gap-6">
        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={isAlive}
            onChange={(e) =>
              setIsAlive(
                e.target.checked
              )
            }
          />

          Alive
        </label>

        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={isRootAncestor}
            onChange={(e) =>
              setIsRootAncestor(
                e.target.checked
              )
            }
          />

          Root Ancestor
        </label>
      </div>

      <button
        type="submit"
        className="
          bg-white
          text-black
          px-5
          py-3
          rounded-lg
        "
      >
        Save Person
      </button>
    </form>
  );
}