"use client";

import { logout } from "@/app/actions/auth";
import { useRouter } from "next/navigation";


export default function LogoutButton() {

  const router = useRouter();


  async function handleLogout() {

    const result = await logout();


    if (result.error) {

      console.log(result.error);

      return;

    }


    router.push("/login");

    router.refresh();

  }


  return (

    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>

  );

}