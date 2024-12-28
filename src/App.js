import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    return token !== null;  
  };

  useEffect(() => {
   
    if (checkToken()) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/todos" /> : <RegisterPage />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/todos" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/todos"
          element={isAuthenticated ? <TodoPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
