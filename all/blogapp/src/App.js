import React from "react";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const currentUser = false;
  return (
  
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route
          exact
          path="/Register"
          element={currentUser ? <Home /> : <Register />}
        />

        <Route
          exact
          path="/Login"
          element={currentUser ? <Home /> : <Login />}
        />

        <Route
          exact
          path="/Write"
          element={currentUser ? <Write /> : <Register />}
        />

        <Route
          exact
          path="/Settings"
          element={currentUser ? <Settings /> : <Login />}
        />
        <Route path="/Post/:PostId" element={<Single />} />
      </Routes>
    </Router>
  );
}


export default App;
