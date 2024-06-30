import React, { useState, useEffect } from "react";
import axios from "axios";
import Create from "./Create";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:3001/update/" + id)
      .then((result) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then((result) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create setTodos={setTodos} />
      {todos.length === 0 ? (
        <div>
          <h2>No Tasks</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task-item" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done? "line":""}>{todo.task}</p>
            </div>
            <div>
              <span onClick={() => handleDelete(todo._id)}>
                <BsFillTrashFill className="icon2" />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
