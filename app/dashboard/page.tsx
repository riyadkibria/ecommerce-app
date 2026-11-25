export const instant = false;

import LogoutButton from "@/components/LogoutButton";
import { getProfile } from "@/app/actions/profile";
import { requireAuth } from "@/lib/auth";


export default async function DashboardPage() {

  await requireAuth();

  const result = await getProfile();


  return (

    <div className="flex min-h-screen items-center justify-center">

      <div className="border p-8 rounded space-y-4">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        {
          result.error ? (

            <p className="text-red-600">
              {result.error}
            </p>

          ) : (

            <div className="space-y-2">

              <p>
                You are logged in.
              </p>

              <p>
                Role:
                {" "}
                <strong>
                  {result.profile?.role}
                </strong>
              </p>

              <p>
                User ID:
                {" "}
                {result.profile?.id}
              </p>

            </div>

          )
        }

        <LogoutButton />

      </div>

    </div>

  );

}