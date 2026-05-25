import Link from "next/link";
import LogoutButton
  from "@/components/admin/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside
        className="
          w-64
          bg-zinc-950
          border-r
          border-zinc-800
          p-6
          flex
          flex-col
        "
      >
        <div>
          <h2 className="text-2xl font-bold mb-8">
            Admin Panel
          </h2>

          <nav className="space-y-4">
            <Link
              href="/admin/dashboard"
              className="
                block
                p-3
                rounded-lg
                hover:bg-zinc-800
              "
            >
              Dashboard
            </Link>

            <Link
              href="/admin/persons"
              className="
                block
                p-3
                rounded-lg
                hover:bg-zinc-800
              "
            >
              People
            </Link>

            <Link
              href="/admin/persons/create"
              className="
                block
                p-3
                rounded-lg
                hover:bg-zinc-800
              "
            >
              Add Person
            </Link>
          </nav>
        </div>

        <div className="mt-auto pt-6">
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}