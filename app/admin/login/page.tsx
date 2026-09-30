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
            group
            inline-flex
            items-center
            gap-3
            min-h-11
            rounded-full
            border
            border-white/15
            bg-zinc-950/90
            pl-2
            pr-5
            text-sm
            font-semibold
            text-zinc-100
            shadow-lg
            shadow-black/30
            backdrop-blur
            transition-colors
            duration-200
            hover:border-cyan-300/50
            hover:bg-zinc-900
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-cyan-300
          "
        >
          <span
            className="
              grid
              size-8
              shrink-0
              place-items-center
              rounded-full
              border
              border-cyan-300/25
              bg-cyan-300/10
              text-lg
              leading-none
              text-cyan-300
              transition-colors
              duration-200
              group-hover:bg-cyan-300/20
            "
            aria-hidden="true"
          >
            ←
          </span>
          Family Tree
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