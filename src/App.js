import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'completed', 'incomplete'

  // Function to add or edit a task
  const handleAddOrEditTodo = () => {
    if (todoName.trim()) {
      if (editIndex !== null) {
        // If in edit mode, update the task
        const updatedTodos = [...todos];
        updatedTodos[editIndex].name = todoName;
        setTodos(updatedTodos);
        setEditIndex(null); // Reset the edit mode
      } else {
        // If not in edit mode, add a new task
        setTodos([...todos, { name: todoName, status: "incomplete" }]);
      }
      setTodoName(""); // Clear the input
    }
  };

  // Function to toggle the status of a task
  const toggleStatus = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index
          ? {
              ...todo,
              status: todo.status === "completed" ? "incomplete" : "completed",
            }
          : todo
      )
    );
  };

  // Function to delete a task
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Function to filter tasks based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.status === "completed";
    if (filter === "incomplete") return todo.status === "incomplete";
  });

  // Function to handle editing a task
  const handleEdit = (index) => {
    setTodoName(todos[index].name);
    setEditIndex(index); // Set the current task index for editing
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Add or edit a task"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
      />
      <button onClick={handleAddOrEditTodo}>
        {editIndex !== null ? "Update Task" : "Add Task"}
      </button>

      <div className="filters">
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <div className="todo-list">
        {filteredTodos.map((todo, index) => (
          <div
            key={index}
            className={`todo-item ${todo.status}`}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span
              onClick={() => toggleStatus(index)}
              style={{
                textDecoration:
                  todo.status === "completed" ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.name}---------{todo.status}
            </span>
            <div>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => deleteTodo(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
