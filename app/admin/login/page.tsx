"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const result = await signIn(
      "credentials",
      {
        email,
        password,
        redirect: false,
      }
    );

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <main
      className="
        min-h-screen
        bg-black
        flex
        items-center
        justify-center
        px-4
        relative
      "
    >
      {/* BACK BUTTON */}
      <div
        className="
          absolute
          top-6
          left-6
        "
      >
        <button
          onClick={() =>
            router.push("/tree")
          }
          className="
            rounded-xl
            border
            border-zinc-700
            bg-zinc-200
            px-4
            py-2
            text-sm
            text-zinc-900
            transition
            hover:bg-zinc-400
            hover:border-zinc-500
          "
        >
          ← Family Tree
        </button>
      </div>

      <form
        onSubmit={handleLogin}
        className="
          bg-zinc-900
          border
          border-zinc-800
          p-8
          rounded-3xl
          w-full
          max-w-md
          space-y-5
          shadow-2xl
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Admin Login
          </h1>

          <p
            className="
              text-zinc-400
              mt-1
            "
          >
            Sign in to manage
            the family tree
          </p>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
            w-full
            p-3
            rounded-xl
            bg-zinc-800
            border
            border-zinc-700
            outline-none
            focus:border-zinc-500
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
            w-full
            p-3
            rounded-xl
            bg-zinc-800
            border
            border-zinc-700
            outline-none
            focus:border-zinc-500
          "
        />

        {error && (
          <p
            className="
              text-red-400
              text-sm
            "
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            rounded-xl
            bg-white
            text-black
            p-3
            font-medium
            transition
            hover:opacity-90
            disabled:opacity-50
          "
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>
    </main>
  );
}