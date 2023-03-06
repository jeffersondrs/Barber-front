import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/footer/Footer";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { logout, getRole } from "../services/auth";
import Loading from "../components/loading/Loading";
import Error from "../components/error/Error";

const url = import.meta.env.VITE_API_URL;

type Staff = {
  createdAt: string;
  email: string;
  name: string;
  photo: string;
  role: string;
  _id: string;
};

export default function Home(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [staff, setStaff] = useState<Staff[]>([]);

  const { isLoading, isError, error, data, isSuccess } = useQuery(
    "staff",
    async () => {
      const response = await axios
        .get(`${url}master/staffs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          return response.data.data;
        });
      return response;
    }
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && data) {
      setIsLoggedIn(true);
      setStaff(data.staff);
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    await axios
      .delete(`${url}master/staff/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
      });

    const response = await axios
      .get(`${url}master/staffs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        return response.data.data;
      });
    setStaff(response.staff);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  console.log(error);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center flex-wrap">
      {isLoggedIn && (
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
          <p className="text-lg p-2">
            Aqui teremos rotas para serem ilustradas, já que todos os dados do
            servidor serão administrados por este dashboard.
          </p>
          <p className="p-2 text-base">
            Em breve irei colocar os endpoints também para facilitar nossa vida.
          </p>
          <p className="p-2">Por enquanto, vamos ver os dados do servidor:</p>
          {isSuccess && (
            <div className="flex flex-row justify-center items-center flex-wrap my-5">
              <h1 className="text-xl font-bold w-full text-center border-solid border-violet-800 border-b-4 border-r border-l p-2 m-5 shadow-md border-t border-t-slate-400 rounded-bl-xl rounded-tr-xl">
                Funcionários cadastrados
              </h1>
              <div className="text-lg w-12 h-12 text-center rounded-full border border-solid border-violet-700 flex flex-col justify-center items-center">
                {staff.length}
              </div>
            </div>
          )}
          <div className="w-full flex flex-row flex-wrap justify-center items-center">
            <ul className="w-full shadow-sm shadow-teal-700 flex flex-row items-center justify-between">
              <li className="w-full h-full flex flex-row items-center justify-center flex-wrap">
                <div className="flex flex-row justify-evenly items-center w-96 h-12">
                  <div className="w-1/ 5 text-center px-1">
                    <p className="mr-5 text-center">Foto</p>
                  </div>
                  <p className="w-3/4 text-center border-r-2">NAME</p>
                </div>
                <div className="flex flex-row justify-evenly items-center w-96 h-10 ">
                  <p className="w-3/4 text-center border-r-2">EMAIL</p>
                  <p className="w-1/4 text-center border-r-2">Função</p>
                </div>

                <div className="flex flex-row justify-evenly items-center w-96 h-10">
                  <p className="w-3/5 text-center border-r-2 px-10">
                    CRIADO EM
                  </p>
                  <p className="w-24 uppercase text-center">AÇÂO</p>
                </div>
              </li>
            </ul>
            <ul className="w-full shadow-sm shadow-teal-700 flex flex-col items-center justify-between">
              {staff.map((staff) => {
                return (
                  <li className="w-full h-full flex flex-row items-center justify-center flex-wrap" key={staff._id} >
                    <div className="flex flex-row justify-evenly items-center w-96 h-12">
                      <div>
                        <img
                          src={staff.photo}
                          alt="Foto do funcionário"
                          className="w-10 h-10 border mr-5 object-cover"
                        />
                      </div>
                      <p className="w-3/4 text-start border-r-2 px-5">
                        {staff.name}
                      </p>
                    </div>
                    <div className="flex flex-row justify-evenly items-center w-96 h-10">
                      <p className="w-3/4 text-start border-r-2 px-5">
                        {staff.email}
                      </p>
                      <p className="w-1/4 text-start border-r-2 px-5">
                        {staff.role}
                      </p>
                    </div>

                    <div className="flex flex-row justify-evenly items-center w-96 h-10">
                      <p className="w-3/5 text-start border-r-2 px-10">
                        {staff.createdAt.split("T")[0].split("-").reverse().join("/")}
                      </p>
                      <button
                        onClick={() => handleDelete(staff._id)}
                        className="flex-shrink-0 bg-red-700 transition-all hover:bg-red-900 border-red-700 hover:border-red-900 text-sm border-4 text-white py-1 px-2 rounded w-24 uppercase font-bold"
                      >
                        Deletar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
