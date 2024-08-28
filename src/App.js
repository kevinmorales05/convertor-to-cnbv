import "./App.css";
import Header from "./components/Header/Header.tsx";

import Login from "./pages/login/Login.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NoMatch from "./pages/nomatch/NoMatch.tsx";
import ConvertCNBV from "./pages/convertCNBV/ConvertCNBV.tsx";
import ConvertCondusef from "./pages/convertCondusef/ConvertCondusef.tsx";
import { Context } from "./context/Context.js";

function App() {
  const [logged, setLogged] = useState(true);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  return (
    <Context.Provider value={{logged, setLogged, token, setToken, username, setUsername}}>
      <Router>
        <Header logged={logged} setLogged={setLogged} />
        <Routes>
          <Route path="/" element={<Login setLogged={setLogged} />} />
          <Route path="/login" element={<Login setLogged={setLogged} />} />
          {logged === true ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/convertCNBV" element={<ConvertCNBV />} />
              <Route path="/convertCondusef" element={<ConvertCondusef />} />
            </>
          ) : (
            <></>
          )}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
