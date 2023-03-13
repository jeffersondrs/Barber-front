import { AuthProvider, AuthContext } from "./context/Auth";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import "./App.scss";
import Navigation from "./components/navegation/Navegation";

function AuthenticatedApp() {
  const Private = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/" replace={true} />;
  };

  return (
    <AuthProvider>
      <Navigation />
      <Routes>
        <Route
          path="/home"
          element={
            <Private>
              <Home />
            </Private>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default AuthenticatedApp;
