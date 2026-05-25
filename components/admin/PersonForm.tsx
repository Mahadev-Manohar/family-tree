"use client";

import { PersonOption } from "@/types/person";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Select = dynamic(
  () => import("react-select"),
  {
    ssr: false,
  }
);

type PersonFormProps = {
  people?: PersonOption[];

  initialData?: {
    id?: string;
    fullName: string;
    gender: string;
    birthDisplay?: string | null;
    deathDisplay?: string | null;
    bio?: string | null;
    profileImageUrl?: string | null;
    isAlive: boolean;
    isRootAncestor: boolean;


    fatherId?: string | null;
    motherId?: string | null;
    spouseId?: string | null;
  };
};

export default function PersonForm({
  initialData,
  people = [],
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

  const [
    profileImageUrl,
    setProfileImageUrl,
  ] = useState(
    initialData?.profileImageUrl ||
      ""
  );

  const [
    isUploading,
    setIsUploading,
  ] = useState(false);

  const [isAlive, setIsAlive] =
    useState(
      initialData?.isAlive ?? true
    );

  const [isRootAncestor, setIsRootAncestor] =
    useState(
      initialData?.isRootAncestor || false
    );

  const [fatherId, setFatherId] =
    useState<string | null>(
      initialData?.fatherId || null
    );

  const [motherId, setMotherId] =
    useState<string | null>(
      initialData?.motherId || null
    );

  const [spouseId, setSpouseId] =
    useState<string | null>(
      initialData?.spouseId || null
    );

  async function handleImageUpload(
    file: File
  ) {
    try {
      setIsUploading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await fetch(
          "/api/upload-image",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      setProfileImageUrl(
        data.imageUrl
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to upload image"
      );
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {

        const isEditing =
          !!initialData?.id;

        const response = await fetch(
          isEditing
            ? `/api/admin/persons/${initialData.id}`
            : "/api/admin/persons",
          {
            method: isEditing
              ? "PUT"
              : "POST",

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
              profileImageUrl,
              isAlive,
              isRootAncestor,
              fatherId,
              motherId,
              spouseId,
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
        setProfileImageUrl("");
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

      <div>
        <label className="block mb-2">
          Profile Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file =
              e.target.files?.[0];

            if (file) {
              handleImageUpload(
                file
              );
            }
          }}
          className="
            block
            w-full
            text-sm
          "
        />

        {isUploading && (
          <p className="mt-2 text-zinc-400">
            Uploading image...
          </p>
        )}

        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt="Preview"
            className="
              mt-4
              w-24
              h-24
              rounded-full
              object-cover
              border
              border-zinc-700
            "
          />
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className="block mb-2">
            Father
          </label>

          <Select className="text-black"
            options={people}
            value={
              people.find(
                (p) => p.value === fatherId
              ) || null
            }
            onChange={(option) =>
              setFatherId(
                (option as PersonOption | null)
                  ?.value || null
              )
            }
            isClearable
            placeholder="Search father..."
          />
        </div>

        <div>
          <label className="block mb-2">
            Mother
          </label>

          <Select className="text-black"
            options={people}
            value={
              people.find(
                (p) => p.value === motherId
              ) || null
            }
            onChange={(option) =>
              setMotherId(
                (option as PersonOption | null)
                  ?.value || null
              )
            }
            isClearable
            placeholder="Search mother..."
          />
        </div>

        <div>
          <label className="block mb-2">
            Spouse
          </label>

          <Select className="text-black"
            options={people}
            value={
              people.find(
                (p) => p.value === spouseId
              ) || null
            }
            onChange={(option) =>
              setSpouseId(
                (option as PersonOption | null)
                  ?.value || null
              )
            }
            isClearable
            placeholder="Search spouse..."
          />
        </div>
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