import { Link, Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import { logout } from "../../context/Auth";
import './navegation.scss'

interface Props {
  onClick?: () => void;
}

export default function Navegation(): JSX.Element {
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <>
      <nav className="w-full border-b-2 border-solid border-violet-700 bg-slate-300 shadow-lg flex justify-between items-center p-5 flex-wrap">
        <button data-text="Aswesome" className="button">
          <span className="actual-text">Project</span>
          <span className="hover-text" data-hidden="true">Project</span>
        </button>
        <Link to="/" onClick={handleLogout}>
          <button className="flex-shrink-0 bg-red-700 transition-all hover:bg-red-900 border-red-700 hover:border-red-900 text-sm border-4 text-white py-1 px-2 rounded w-36 uppercase font-bold">
            Logout
          </button>
        </Link>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
}
function setIsLoggedIn(arg0: boolean) {
  throw new Error("Function not implemented.");
}
