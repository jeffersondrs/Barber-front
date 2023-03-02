import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link to="/">Login</Link>
      </button>
    </div>
  );
}
