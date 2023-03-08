import { AuthProvider, AuthContext } from "./context/Auth";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import "./App.scss"

function App() {
  const Private = ({ children }: any) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? (
      children
    ) : (
      <Navigate to="/login" replace={true} />
    );
  };

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Private>
              <Home />
            </Private>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
