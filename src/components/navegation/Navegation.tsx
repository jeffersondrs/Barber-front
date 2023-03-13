import { Link, Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import { logout } from "../../context/Auth";
import "./navegation.scss";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const url = import.meta.env.VITE_API_URL;
interface Props {
  onClick?: () => void;
}

type MasterInfo = {
  name: string;
  email: string;
  photo: number;
  role: string;
  _id: string;
  barbearia: string;
};

export default function Navegation(): JSX.Element {
  const [masterInfo, setMasterInfo] = useState<MasterInfo[]>([]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    window.location.reload();
  };

  const {
    isLoading,
    isError,
    error,
    data: master,
    isSuccess,
  } = useQuery("masterInfo", async () => {
    const response = await axios
      .get(`${url}master/me/${localStorage.getItem("id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setMasterInfo(response.data.data);
        return response.data.data;
      });
    return response;
  });

  const infos = Object.values(masterInfo);

  return (
    <>
      {isSuccess && (
        <nav className="w-full border-b-2 border-solid border-violet-700 bg-teal-900 shadow-lg flex justify-between items-center p-5 flex-wrap navegation__menu">
          <button data-text="Aswesome" className="button">
            <span className="actual-text">
              {infos.map((info) => {
                return info.barbearia;
              })}
            </span>
            <span className="hover-text" data-hidden="true">
              {infos.map((info) => {
                return info.barbearia;
              })}
            </span>
          </button>
          <div>
            {infos.map((info) => {
              return (
                <div
                  className="flex flex-row p-2 justify-center items-center"
                  key={info._id}
                >
                  <img
                    className="w-12 h-12 rounded-full mr-4"
                    src={`${info.photo}`}
                    alt="Avatar of Jonathan Reinink"
                  />
                  <div className="text-base font-medium flex flex-col justify-center items-end">
                    <Link
                      to="/profile"
                      className="text-white hover:text-gray-300 text-base font-medium capitalize"
                    >
                      <p>{info.name}</p>

                      <p>{info.role}</p>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <Link to="/" onClick={handleLogout}>
            <button className="flex-shrink-0 bg-red-700 transition-all hover:bg-red-900 border-red-700 hover:border-red-900 text-sm border-4 text-white py-1 px-2 rounded w-36 uppercase font-bold">
              Logout
            </button>
          </Link>
        </nav>
      )}
      <Outlet />
    </>
  );
}
function setIsLoggedIn(arg0: boolean) {
  throw new Error("Function not implemented.");
}
