import Footer from "../components/footer/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="w-full h-full flex flex-col justify-evenly items-center">
        <h1 className="text-4xl text-center">404 Not Found</h1>
        <img
          src="https://media.giphy.com/media/3o7TKSjRrfIPjeUGDK/giphy.gif"
          alt="404 Not Found"
        />
      </div>
      <Footer />
    </div>
  );
}
