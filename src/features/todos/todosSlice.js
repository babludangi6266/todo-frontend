import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://todolist-backend-jtyq.onrender.com/api/todos";

// Fetch Todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (_, { getState }) => {
  const token = localStorage.getItem("token");  
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },  
  });
  return response.data;
});

// Add Todo
export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo, { getState }) => {
  const token = localStorage.getItem("token");  
  const response = await axios.post(API_URL, newTodo, {
    headers: { Authorization: `Bearer ${token}` },  
  });
  return response.data;
});
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id, { getState }) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  });
  
  // Update Todo
  export const updateTodo = createAsyncThunk("todos/updateTodo", async ({ id, name, description }, { getState }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/${id}`,
      { name, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  });
  
  const todosSlice = createSlice({
    name: "todos",
    initialState: {
      items: [],
      status: "idle",
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
       
        .addCase(fetchTodos.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.items = action.payload;
        })
        .addCase(fetchTodos.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
        .addCase(addTodo.fulfilled, (state, action) => {
          state.items.push(action.payload);
        })
        // Delete Todo
        .addCase(deleteTodo.fulfilled, (state, action) => {
          state.items = state.items.filter((todo) => todo._id !== action.payload);
        })
        // Update Todo
        .addCase(updateTodo.fulfilled, (state, action) => {
          const index = state.items.findIndex((todo) => todo._id === action.payload._id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        });
    },
  });
  export default todosSlice.reducer;  