import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/NavBar";
import Registration from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddFoodForm from "./components/AddFoodForm"; // Import AddFoodForm

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // State to store user's name

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userName={userName} />
        <ToastContainer />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} />} />
              <Route path="/add" element={<AddFoodForm isLoggedIn={isLoggedIn}/>} /> {/* Route for AddFoodForm */}
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />} />
              <Route path="/register" element={<Registration setIsLoggedIn={setIsLoggedIn} />} />
            </>
          )}
        </Routes>
      </>
    </Router>
  );
}

export default App;
