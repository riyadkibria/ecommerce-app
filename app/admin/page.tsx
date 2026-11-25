import { requireRole } from "@/lib/auth";

export default async function AdminPage() {

  const { user } = await requireRole("admin");

  return (

    <div className="flex min-h-screen items-center justify-center">

      <div className="border rounded p-8">

        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-4">
          Welcome {user.email}
        </p>

      </div>

    </div>

  );

}