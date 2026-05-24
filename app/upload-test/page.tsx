"use client";

import {
  useState,
} from "react";

export default function UploadTestPage() {
  const [
    imageUrl,
    setImageUrl,
  ] = useState("");

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const res =
      await fetch(
        "/api/upload-image",
        {
          method: "POST",

          body:
            formData,
        }
      );

    const data =
      await res.json();

    setImageUrl(
      data.imageUrl
    );
  }

  return (
    <div className="p-10">
      <input
        type="file"
        onChange={
          handleUpload
        }
      />

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="
            mt-6
            w-40
            rounded-full
          "
        />
      )}
    </div>
  );
}