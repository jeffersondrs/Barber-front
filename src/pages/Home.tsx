import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useQuery } from "react-query";
import Error from "../components/error/Error";
import "../assets/styles/home.style.scss";
import Footer from "../components/footer/Footer";

const apiUrl = import.meta.env.VITE_API_URL;

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
      const response = await axios.get(`${apiUrl}master/staffs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    }
  );

  const fetchUsers = async () => {
    const response = await axios.get(`${apiUrl}master/staffs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  };

  const fetchServices = async () => {
    const response = await axios.get(`${apiUrl}master/services`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && data) {
      setIsLoggedIn(true);
      setStaff(data.staff);
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    await axios.delete(`${apiUrl}master/staff/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const updatedStaff = await fetchUsers();
    setStaff(updatedStaff);
  };

  if (isError) return <Error />;

  return (
    <>
      <main className="w-full h-full flex flex-col items-center flex-wrap">
        <div className="w-full flex flex-col justify-between items-center">
          {isLoggedIn && (
            <>
              <section id="section__home">
                <h1 className="text-4xl m-10 text-center">
                  Bem vindo ao admin da Barbearia
                </h1>
                <p className="text-lg px-10 text-center">
                  Aqui teremos rotas para serem ilustradas, já que todos os
                  dados do servidor serão administrados por este dashboard.
                </p>
                <p className="px-2 text-base text-center">
                  Em breve irei colocar os endpoints também para facilitar nossa
                  vida.
                </p>
                <p className="px-2 text-center">
                  Por enquanto, vamos ver os dados do servidor:
                </p>
              </section>
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
              <div className="w-full flex flex-row flex-wrap justify-center items-center h-full">
                <div
                  className="w-full text-xs shadow-sm flex flex-row bg-teal-300 items-center justify-between px-20"
                  id="table__list"
                >
                  <div className="flex flex-row w-full">
                    <div className="w-full border-r px-5 flex flex-row justify-center uppercase">
                      <p>Foto</p>
                    </div>
                    <div className="uppercase text-center border-r w-full">
                      <p>Nome</p>
                    </div>
                    <div className="uppercase text-center border-r w-full">
                      <p>E-mail</p>
                    </div>
                    <div className="uppercase text-center border-r w-full">
                      <p>Função</p>
                    </div>
                    <div className="uppercase text-center border-r w-full">
                      <p>Criado em</p>
                    </div>
                    <div className="uppercase text-center w-full">Ação</div>
                  </div>
                </div>
                <ul className="w-full mb-5 py-1flex flex-col items-center justify-between px-10">
                  {staff.map((staff) => {
                    return (
                      <li
                        className="flex flex-row w-full py-2 hover:bg-slate-30"
                        id="card__staff"
                        key={staff._id}
                      >
                        <div className="w-full border-r px-5 flex flex-row justify-center">
                          <img
                            src={staff.photo}
                            alt="Foto do funcionário"
                            className="w-12 h-12 object-cover bg-center rounded-full"
                          />
                        </div>
                        <div className="uppercase text-center border-r w-full flex flex-row justify-center items-center">
                          <p>{staff.name}</p>
                        </div>
                        <div className="uppercase text-center border-r w-full flex flex-row justify-center items-center">
                          <p>{staff.email}</p>
                        </div>
                        <div className="uppercase text-center border-r w-full flex flex-row justify-center items-center">
                          <p>{staff.role}</p>
                        </div>

                        <div className="uppercase text-center border-r w-full flex flex-row justify-center items-center">
                          <p>
                            {staff.createdAt
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("/")}
                          </p>
                        </div>
                        <div className="uppercase text-center px-5 flex flex-row justify-center">
                          <button
                            onClick={() => handleDelete(staff._id)}
                            className="flex-shrink-0 bg-red-700 transition-all hover:bg-red-900 border-red-700 hover:border-red-900 text-sm border-4 text-white py-1 px-2 rounded w-28 uppercase font-bold"
                          >
                            Deletar
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
