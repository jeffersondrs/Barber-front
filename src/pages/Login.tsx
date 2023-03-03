import { Link } from "react-router-dom";
import Form from "../components/form/Form.component";
import Footer from "../components/footer/Footer";

export default function Login() {
  return (
    <div className="h-screen w-full flex flex-col items-center">
      <div className="w-full h-full flex flex-col justify-end items-center">
        <Form />
      </div>
      <div className="flex flex-col justify-end h-full">
        <Footer />
      </div>
    </div>
  );
}
