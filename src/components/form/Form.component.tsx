import React, { useState, useRef } from "react";
import { Route, useNavigate } from "react-router-dom";
import { request } from "../../services/auth";

type RequestLogin = {
  email: string;
  password: string;
};

export default function Form() {
  const navigate = useNavigate();
  const [errorMessage, setError] = useState<string | null>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return;
    }

    const requestlog: RequestLogin = {
      email,
      password,
    };

    const response = await request(requestlog);

    if (response) {
      navigate("/home");
    } 
    setError("Invalid credentials");
  };

  return (
    <form
      className="w-full max-w-sm p-5 bg-white shadow-xl transition-all xl:rounded-xl"
      onSubmit={handleSubmit}
    >
      {errorMessage && (
        <span
          className="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
          role="alert"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M11.293 10l3.146-3.146a.5.5 0 0 0-.708-.708L10.586 9.293 7.44 6.146a.5.5 0 1 0-.708.708L9.879 10l-3.147 3.146a.5.5 0 0 0 .708.708L10.586 10.707l3.146 3.147a.5.5 0 0 0 .708-.708L11.293 10z" />
          </svg>
          <p>{errorMessage}</p>
        </span>
      )}

      <div className="h-48 flex flex-col justify-evenly">
        <div className="flex items-center border-b-2 border-teal-500 py-2 my-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none lowercase"
            type="text"
            placeholder="e-mail"
            aria-label="e-mail"
            ref={emailRef}
          />
        </div>

        <div className="flex items-center border-b-2 border-teal-500 py-2 my-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none lowercase"
            type="password"
            placeholder="password"
            aria-label="password"
            ref={passwordRef}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-2 m-3">
        <input
          className="flex-shrink-0 bg-teal-500 transition-all hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded w-36 uppercase font-bold"
          type="submit"
          value="Login"
        />
      </div>
    </form>
  );
}
