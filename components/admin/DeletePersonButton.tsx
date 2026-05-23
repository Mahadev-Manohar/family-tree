"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function DeletePersonButton({
  id,
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed =
      confirm(
        "Are you sure you want to delete this person?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/admin/persons/${id}`,
          {
            method: "DELETE",
          }
        );

      if (!response.ok) {
        throw new Error(
          "Delete failed"
        );
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
      );
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="
        bg-red-600
        px-3
        py-1
        rounded
      "
    >
      Delete
    </button>
  );
}