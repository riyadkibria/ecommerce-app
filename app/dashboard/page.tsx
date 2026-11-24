import LogoutButton from "@/components/LogoutButton";


export default function DashboardPage() {

  return (

    <div className="flex min-h-screen items-center justify-center">

      <div className="border p-8 rounded space-y-4">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>


        <p>
          You are logged in.
        </p>


        <LogoutButton />


      </div>

    </div>

  );

}