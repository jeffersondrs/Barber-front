import "./App.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFOund from "./pages/NotFound";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/Auth";

function App() {
  const Private = ({ children }: any) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/login" replace={true} />;
  };

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route path="*" element={<NotFOund />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
