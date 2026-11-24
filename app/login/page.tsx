"use client";

import { useState } from "react";
import { login } from "@/app/actions/auth";


export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");


  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();


    const result = await login(
      email,
      password
    );


    if (result.error) {
      setMessage(result.error);
      return;
    }


    setMessage("Login successful");

  }


  return (

    <div className="flex min-h-screen items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="space-y-4 border p-6 rounded"
      >

        <h1 className="text-2xl font-bold">
          Login
        </h1>


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border p-2"
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border p-2"
        />


        <button
          type="submit"
          className="bg-black text-white p-2 rounded"
        >
          Login
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