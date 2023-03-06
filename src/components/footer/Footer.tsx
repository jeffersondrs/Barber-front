import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-transparent flex justify-evenly items-center">
      <p>Copyright &copy;</p>
      <p className="text-white">Barber 2023</p>
      <p className="mx-3">
        Desenvolvidor com amor
        <span className="mx-2">
          <Link to="https://github.com/jeffersondrs">
            <strong>JeffersonDRS</strong>
          </Link>
        </span>
      </p>
    </footer>
  );
}
