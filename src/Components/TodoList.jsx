import React, { useState, useEffect } from "react";
import "../styles/TODO.css"; // Import the CSS file

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage when the component mounts
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [input, setInput] = useState("");

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      const newTodos = [...todos, { text: input, completed: false }];
      setTodos(newTodos);
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo_container">
      <h1>📌 My To-Do List</h1>
      <div className="input_container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>➕</button>
      </div>
      <ul>
        {todos.length === 0 ? (
          <p className="empty_message">No tasks yet. Add some!</p>
        ) : (
          todos.map((todo, index) => (
            <li key={index} className={todo.completed ? "completed" : ""}>
              <span onClick={() => toggleComplete(index)}>{todo.text}</span>
              <button className="delete_btn" onClick={() => deleteTodo(index)}>
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
