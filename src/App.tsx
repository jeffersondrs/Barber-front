import { AuthProvider } from "./context/Auth";
import { Route, Routes } from "react-router-dom";
import Staffs from "./pages/Staffs";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import "./App.scss";
import Navigation from "./components/navegation/Navegation";
import Home from "./pages/Home";

function AuthenticatedApp() {

  return (
    <AuthProvider>
      <Navigation />
      <Routes>
        <Route
          path="/funcionarios"
          element={
            <Staffs />
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default AuthenticatedApp;
