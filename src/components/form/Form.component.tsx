import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../services/auth";

type RequestLogin = {
  email: string;
  password: string;
};

export default function Form() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const requestlog: RequestLogin = {
      email,
      password,
    };

    const response = await request(requestlog);
  };

  return (
    <form className="w-full max-w-sm p-5" onSubmit={handleSubmit}>
      <div className="flex items-center border-b-2 border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="e-mail"
          aria-label="e-mail"
          ref={emailRef}
        />
      </div>
      <div className="flex items-center border-b-2 border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="password"
          placeholder="password"
          aria-label="password"
          ref={passwordRef}
        />
      </div>
      <div className="flex flex-col justify-center items-center p-2">
        <input
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
          value="Login"
        />
      </div>
    </form>
  );
}
