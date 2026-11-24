"use server";

import { createClient } from "@/lib/supabase/server";


// =======================
// REGISTER ACTION
// =======================

export async function register(
  email: string,
  password: string
) {

  const supabase = await createClient();


  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
    });


  if (error) {
    return {
      error: error.message,
    };
  }


  return {
    success: true,
    user: data.user,
  };

}


// =======================
// LOGIN ACTION
// =======================

export async function login(
  email: string,
  password: string
) {

  const supabase = await createClient();


  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });


  if (error) {
    return {
      error: error.message,
    };
  }


  return {
    success: true,
    user: data.user,
  };

}