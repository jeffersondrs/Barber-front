import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import Footer from "../components/footer/Footer";

const url = import.meta.env.VITE_API_URL;
const isLoggedIn: boolean = false;

export default function Home(): JSX.Element {
  const [isLogged, setIsLogged] = useState(isLoggedIn);

  const { isLoading, error, data } = useQuery("barbers", () =>
    axios
      .get(`${url}/master/staffs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        res.data.data.staff;
        setIsLogged(true);
      })
      .catch((err) => console.log(err))
      .finally(() => console.log("finally"))
  );

  if (isLoading) return <div>Loading...</div>;

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      {isLogged ? (
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <h1 className="text-4xl">Welcome to Barber</h1>
          {
            // @ts-ignore
            data.map((barber: any) => {
              return (
                <div key={barber.id}>
                  <h1>{barber.name}</h1>
                  <p>{barber.email}</p>
                  <p>{barber.photo}</p>
                  <p>{barber.role}</p>
                  <p>{barber.createdAt}</p>
                  <p>{barber._id}</p>
                </div>
              );
            })
          }
          <Link to="/login" onClick={handleLogout}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </Link>
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
              <button className="bg-sky-500 w-40 h-12 text-xl uppercase hover:bg-sky-700 text-white font-bold py-2 px-4 rounded transition-all ease-linear">
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
