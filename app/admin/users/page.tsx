import { getAllUsers } from "@/app/actions/users";


export default async function UsersPage() {


  const result = await getAllUsers();


  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Users Management
      </h1>


      {
        result.error ? (

          <p className="text-red-600">
            {result.error}
          </p>

        ) : (

          <div className="border rounded">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="p-3 text-left">
                    User ID
                  </th>


                  <th className="p-3 text-left">
                    Email
                  </th>


                  <th className="p-3 text-left">
                    Role
                  </th>


                </tr>

              </thead>


              <tbody>

                {
                  result.users?.map((user) => (

                    <tr
                      key={user.id}
                      className="border-b"
                    >

                      <td className="p-3">
                        {user.id}
                      </td>


                      <td className="p-3">
                        {user.email}
                      </td>


                      <td className="p-3">
                        {user.role}
                      </td>


                    </tr>

                  ))
                }

              </tbody>


            </table>

          </div>

        )
      }


    </div>

  );

}