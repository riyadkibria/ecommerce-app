"use client";

import { useState } from "react";
import { register } from "@/app/actions/auth";


export default function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");


  async function handleRegister(
    e: React.FormEvent
  ) {

    e.preventDefault();


    const result = await register(
      email,
      password
    );


    if (result.error) {
      setMessage(result.error);
      return;
    }


    setMessage(
      "Registration successful"
    );

  }


  return (

    <div className="flex min-h-screen items-center justify-center">

      <form
        onSubmit={handleRegister}
        className="space-y-4 border p-6 rounded"
      >

        <h1 className="text-2xl font-bold">
          Register
        </h1>


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
          className="border p-2"
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
          className="border p-2"
        />


        <button
          type="submit"
          className="bg-black text-white p-2 rounded"
        >
          Register
        </button>


        {
          message &&
          <p>
            {message}
          </p>
        }


      </form>

    </div>

  );
}