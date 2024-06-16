import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

function App(props) {
  const url = "https://api.herokuapp.com/todos/";
  const [posts, setPosts] = useState([]);
  const nullTodo = {
    subject: "",
    details: "",
  };
  const [targetTodo, setTargetTodo] = useState(nullTodo);

  const getTodos = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  const addTodos = async (newTodo) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    getTodos();
    props.history.push("/");
  };

  const getTargetTodo = (todo) => {
    setTargetTodo(todo);
    props.history.push("/edit");
  };

  const updateTodo = async (todo) => {
    const response = await fetch(url + todo.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    getTodos();
    props.history.push("/");
  };

  const deleteTodo = async (todo) => {
    const response = await fetch(url + todo.id + "/", {
      method: "delete",
    });
    getTodos();
    props.history.push("/");
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<AllPosts posts={posts} />}
          />
          <Route
            path="/post/:id"
            element={<SinglePost posts={posts} edit={getTargetTodo} deleteTodo={deleteTodo} />}
          />
          <Route
            path="/new"
            element={<Form initialTodo={nullTodo} handleSubmit={addTodos} buttonLabel="create todo" />}
          />
          <Route
            path="/edit"
            element={<Form initialTodo={targetTodo} handleSubmit={updateTodo} buttonLabel="update todo" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;