import { Link } from "react-router-dom";
import "./footer.styles.scss";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center py-12 bg-teal-900 text-white">
      <p>Copyright &copy;</p>
      <p className="">Barber 2023</p>
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
