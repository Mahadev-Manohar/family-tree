import Link from "next/link";

import LogoutButton
  from "@/components/admin/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        min-h-screen
        bg-black
        text-white
        flex
      "
    >
      {/* SIDEBAR */}
      <aside
        className="
          w-80
          border-r
          border-zinc-800
          bg-[#0a0a0a]
          flex
          flex-col
          px-6
          py-8
        "
      >
        <div>
          <h1
            className="
              text-4xl
              font-bold
              mb-1
            "
          >
            Admin Panel
          </h1>

          <p
            className="
              text-zinc-500
              text-sm
              mb-10
            "
          >
            Family tree management
          </p>

          <nav className="space-y-4">
            <Link
              href="/admin/dashboard"
              className="
                block
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                px-6
                py-4
                transition
                hover:border-zinc-700
                hover:bg-zinc-800
                text-center
              "
            >
              Dashboard
            </Link>

            <Link
              href="/admin/persons"
              className="
                block
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                px-6
                py-4
                transition
                hover:border-zinc-700
                hover:bg-zinc-800
                text-center
              "
            >
              People
            </Link>

            <Link
              href="/admin/persons/create"
              className="
                block
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                px-6
                py-4
                transition
                hover:border-zinc-700
                hover:bg-zinc-800
                text-center
              "
            >
              Add Person
            </Link>
          </nav>
        </div>

        <div className="mt-auto">
          <LogoutButton />
        </div>
      </aside>

      {/* CONTENT */}
      <main
        className="
          flex-1
          bg-black
          px-14
          py-12
          overflow-y-auto
        "
      >
        {children}
      </main>
    </div>
  );
}