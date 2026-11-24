"use server";

import { createClient } from "@/lib/supabase/server";


export async function getProfile() {

  const supabase = await createClient();


  // Get logged in user

  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();



  if (!user) {

    return {
      error: "Not authenticated",
    };

  }



  // Get profile data

  const {
    data: profile,
    error,
  } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();



  if (error) {

    return {
      error: error.message,
    };

  }



  return {
    profile,
  };

}