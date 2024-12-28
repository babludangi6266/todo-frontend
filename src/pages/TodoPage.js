import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import "../styles/Todo.css";

const TodoPage = () => {
  const navigate = useNavigate();
 
  const handleLogout = () => {
   
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="todo-page">
      <header className="todo-header">
        <h1>Welcome to Your TODO Manager</h1>
        <p>
          Stay organized and track your tasks effortlessly. Add, view, and manage your todos all in one place!
        </p>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main>
        <TodoForm />
        <TodoList />
      </main>
      <footer className="todo-footer">
        <p>© 2024 Todo Manager. All Rights Reserved. Built with <span>❤️</span> by Bablu .
        </p>
      </footer>
    </div>
  );
};

export default TodoPage;
