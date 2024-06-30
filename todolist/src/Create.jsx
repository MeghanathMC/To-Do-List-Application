import React, { useState } from "react";
import axios from "axios";

function Create({ setTodos }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    axios
      .post("http://localhost:3001/add", { task })
      .then((result) => {
        setTodos((prevTodos) => [...prevTodos, result.data]);
        setTask("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
