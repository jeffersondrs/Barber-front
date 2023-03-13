import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestLogin } from "../context/Auth";
import Footer from "../components/footer/Footer";

interface LoginProps {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar entrada
    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);
    setError("");

    const login: LoginProps = {
      email,
      password,
    };

    try {
      const response = await requestLogin(login);

      if (response.status === "success") {
        navigate("/home");
      }
    } catch (error) {
      setError(
        "Houve um erro ao tentar fazer o login. Por favor, verifique suas credenciais."
      );
    }

    setIsLoading(false);
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <form
          className="w-full max-w-sm p-5 bg-white shadow-xl transition-all xl:rounded-xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-center text-login uppercase">
            Login
          </h1>

          <div className="h-48 flex flex-col justify-evenly">
            <div className="flex items-center border-b-2 border-teal-500 py-2 my-2">
              <label htmlFor="email" className="sr-only">
                E-mail
              </label>
              <input
                id="email"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none lowercase"
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center border-b-2 border-teal-500 py-2 my-2">
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none lowercase"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center p-2 m-3">
            <button
              className="flex-shrink-0 bg-teal-500 transition-all hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded w-36 uppercase font-bold"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Aguarde..." : "Login"}
            </button>

            {error && <div className="mt-3 text-red-500 text-sm">{error}</div>}
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
