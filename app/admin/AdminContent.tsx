import { requireRole } from "@/lib/auth";


export default async function AdminContent() {

  try {

    const { user } = await requireRole("admin");


    return (

      <div className="flex min-h-screen items-center justify-center">

        <div className="border rounded p-8">

          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-3">
            Welcome {user.email}
          </p>

        </div>

      </div>

    );


  } catch (error) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <div className="border rounded p-8 text-center">

          <h1 className="text-3xl font-bold text-red-600">
            Access Denied
          </h1>


          <p className="mt-3">
            You don't have permission to view this page.
          </p>

        </div>

      </div>

    );

  }

}