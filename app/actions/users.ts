"use server";

import { createClient } from "@/lib/supabase/server";


export async function getAllUsers() {

  const supabase = await createClient();


  const { data: users, error } =
    await supabase
      .from("profiles")
      .select("*")
      .order("created_at", {
        ascending: false,
      });


  if (error) {

    return {
      error: error.message,
      users: [],
    };

  }


  return {
    users,
  };

}