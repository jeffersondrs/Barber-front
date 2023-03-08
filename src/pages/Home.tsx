import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/footer/Footer";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { logout } from "../context/Auth";
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

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    window.location.reload();
  };

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
    <>
      <div className="w-full h-full flex flex-colitems-center flex-wrap">
        {isLoggedIn && (
          <div className="w-full h-screen flex flex-col justify-between items-center">
            <nav className="w-full border-b-2 border-solid border-violet-700 bg-slate-300 shadow-lg flex justify-between items-center p-5 flex-wrap">
              <h1 className="text-4xl">Barber</h1>
              <Link to="/" onClick={handleLogout}>
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
              Em breve irei colocar os endpoints também para facilitar nossa
              vida.
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
              <ul className="w-full h-14 text-xs shadow-sm flex flex-row bg-sky-300 items-center justify-between px-20">
                <div className="flex flex-row w-full">
                  <li className="w-full border-r px-5 flex flex-row justify-center uppercase">
                    <p>Foto</p>
                  </li>
                  <li className="uppercase text-center border-r w-full">
                    <p>Nome</p>
                  </li>
                  <li className="uppercase text-center border-r w-full">
                    <p>E-mail</p>
                  </li>
                  <li className="uppercase text-center border-r w-full">
                    <p>Função</p>
                  </li>

                  <li className="uppercase text-center border-r w-full">
                    <p>Criado em</p>
                  </li>
                  <li className="uppercase text-center w-full">Ação</li>
                </div>
              </ul>
              <ul className="w-full mb-5 py-1flex flex-col items-center justify-between px-10">
                {staff.map((staff) => {
                  return (
                    <div className="flex flex-row w-full py-2 hover:bg-slate-300">
                      <li className="w-full border-r px-5 flex flex-row justify-center">
                        <img
                          src={staff.photo}
                          alt="Foto do funcionário"
                          className="w-12 h-12 object-cover bg-center rounded-full"
                        />
                      </li>
                      <li className="uppercase text-center border-r w-full flex flex-row justify-center items-center">
                        <p>{staff.name}</p>
                      </li>
                      <li className="uppercase text-center border-r w-full flex flex-row justify-center items-center">
                        <p>{staff.email}</p>
                      </li>
                      <li className="uppercase text-center border-r w-full flex flex-row justify-center items-center">
                        <p>{staff.role}</p>
                      </li>

                      <li className="uppercase text-center border-r w-full flex flex-row justify-center items-center">
                        <p>
                          {staff.createdAt
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/")}
                        </p>
                      </li>
                      <li className="uppercase text-center px-5 flex flex-row justify-center">
                        <button
                          onClick={() => handleDelete(staff._id)}
                          className="flex-shrink-0 bg-red-700 transition-all hover:bg-red-900 border-red-700 hover:border-red-900 text-sm border-4 text-white py-1 px-2 rounded w-36 uppercase font-bold"
                        >
                          Deletar
                        </button>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}
