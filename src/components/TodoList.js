
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo, updateTodo } from "../features/todos/todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const status = useSelector((state) => state.todos.status);

  const [editingTodo, setEditingTodo] = useState(null); 
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleEdit = (todo) => {
    setEditingTodo(todo._id);
    setEditedName(todo.name);
    setEditedDescription(todo.description);
  };

  const handleUpdate = () => {
    dispatch(updateTodo({ id: editingTodo, name: editedName, description: editedDescription }));
    setEditingTodo(null); 
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading todos.</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            {editingTodo === todo._id ? (
              <div className="todo-edit">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Edit Todo Name"
                />
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Edit Todo Description"
                />
                <button onClick={handleUpdate} className="save-btn">Save</button>
                <button onClick={() => setEditingTodo(null)} className="cancel-btn">Cancel</button>
              </div>
            ) : (
              <div className="todo-content">
                <h3>{todo.name}</h3>
                <p>{todo.description}</p>
                <div className="todo-actions">
                  <button onClick={() => handleEdit(todo)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(todo._id)} className="delete-btn">Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
