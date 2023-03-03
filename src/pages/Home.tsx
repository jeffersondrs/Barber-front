import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/footer/Footer";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { logout } from "../services/auth";
import Fetcher from "../components/fetchdata/FetchData";
import Loading from "../components/loading/Loading";
import Error from "../components/error/Error";

const url = import.meta.env.VITE_API_URL;

export default function Home(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isLoading, error, data } = useQuery("staff", async () => {
    const { data } = await axios.get(`${url}master/staffs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [data]);

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  return (
    <>
      {isLoggedIn ? (
        <div className="w-full h-screen flex flex-col justify-between items-center">
          <nav className="w-full h-20 border-b-2 border-solid border-violet-700 bg-slate-300 shadow-lg flex justify-between items-center p-5">
            <h1 className="text-4xl">Barber</h1>
            <Link to="/" onClick={logout}>
              <button className="flex-shrink-0 bg-red-700 transition-all hover:bg-red-900 border-red-700 hover:border-red-900 text-sm border-4 text-white py-1 px-2 rounded w-36 uppercase font-bold">
                Logout
              </button>
            </Link>
          </nav>
          <h1 className="text-4xl m-10">Bem vindo ao admin da Barbearia</h1>
          <p className="text-lg">
            Aqui teremos rotas para serem ilustradas, já que todos os dados do
            servidor serão administrados por este dashboard.
          </p>
          <p>
            Em breve irei colocar os endpoints também para facilitar nossa vida.
          </p>
          <p>Por enquanto, vamos ver os dados do servidor:</p>
          {}
          <Footer />
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <div className="w-80 h-96 bg-slate-300 shadow-xl m-5 rounded-xl flex flex-col items-center justify-evenly">
            <h1 className="text-4xl w-72 text-center">
              Projeto Barber Agendamento
            </h1>
            <p className="text-2xl w-72 text-center">
              Faça seu login para continuar
            </p>
            <Link to="/">
              <button className="flex-shrink-0 bg-teal-500 transition-all hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded w-36 uppercase font-bold">
                Login
              </button>
            </Link>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
