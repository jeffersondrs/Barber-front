import Footer from "../components/footer/Footer";
import { useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, requestLogin } from "../context/Auth";

interface LoginProps {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const login: LoginProps = {
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
    };

    const response = await requestLogin(login);

    if (response.status === "success") {
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <form
          className="w-full max-w-sm p-5 bg-white shadow-xl transition-all xl:rounded-xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-center text-login uppercase">Login</h1>

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
      </div>

      <Footer />
    </div>
  );
}
