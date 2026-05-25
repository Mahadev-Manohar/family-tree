"use client";

import { signOut }
  from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl:
            "/admin/login",
        })
      }
      className="
        w-full
        rounded-lg
        border
        border-red-900/40
        bg-red-950/40
        p-3
        text-red-400
        transition
        hover:bg-red-900/30
      "
    >
      Logout
    </button>
  );
}