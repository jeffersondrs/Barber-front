import { Link } from "react-router-dom";
import Footer from "../footer/Footer";

export default function Error() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-80 h-96 bg-slate-300 shadow-xl m-5 rounded-xl flex flex-col items-center justify-evenly">
        <h1 className="text-4xl w-72 text-center">
          Projeto Barber Agendamento
        </h1>
        <p className="text-2xl w-72 text-center">
          Faça seu login para utilizar o sistema!
        </p>
        <Link to="/">
          <button className="flex-shrink-0 bg-teal-500 transition-all hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded w-36 uppercase font-bold">
            Login
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
