import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFOund from "./pages/NotFound";
import { isAuthenticated } from "./services/auth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={isAuthenticated() ? <Home /> : <Login />}
        />
        <Route path="*" element={<NotFOund />} />
      </Routes>
    </div>
  );
}

export default App;