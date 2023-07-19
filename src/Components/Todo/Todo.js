import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        title: inputValue,
        isComplete: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleEditTodo = (itemId) => {
    const editedTodo = todos.find((todo) => todo.id === itemId);
    if (editedTodo) {
      setInputValue(editedTodo.title);
      setEditingItemId(itemId);
    }
  };

  const handleUpdateTodo = () => {
    if (editingItemId !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingItemId ? { ...todo, title: inputValue } : todo
      );
      setTodos(updatedTodos);
      setInputValue("");
      setEditingItemId(null);
    }
  };

  const handleToggleComplete = (itemId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === itemId ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (itemId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== itemId);
    setTodos(updatedTodos);
  };

  return (
    <Box>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a todo..."
      />
      {editingItemId !== null ? (
        <Button onClick={handleUpdateTodo}>Update</Button>
      ) : (
        <Button onClick={handleAddTodo}>Add</Button>
      )}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.isComplete ? "line-through" : "none",
              }}>
              {todo.title}
            </span>
            <Button onClick={() => handleEditTodo(todo.id)}>Edit</Button>
            <Button onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
            <FormControlLabel
              control={
                <Checkbox
                  checked={todo.isComplete}
                  onChange={() => handleToggleComplete(todo.id)}
                />
              }
            />
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default TodoList;
