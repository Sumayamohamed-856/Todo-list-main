import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import axios from "axios";
import { useNavigate } from "react-router";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = (todo) => {
    if (!todo.task || /^\s*$/.test(todo.task)) {
      return;
    }
    const access_token = window.localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .post("https://sm-todo-list.herokuapp.com/todos/", todo, config)
      .then((response) => {
        console.log(response);
        todo = response.data.todo;
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTodos = () => {
    const access_token = window.localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .get("https://sm-todo-list.herokuapp.com/todos/", config)
      .then((response) => {
        let todos = response.data;
        setTodos(todos);
      })
      .catch((err) => {
        if(err.response.status === 401) {
          window.localStorage.removeItem("access_token")
          navigate('/')
        }
        console.log(err.response.status);

      });
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.task || /^\s*$/.test(newValue.task)) {
      return;
    }

    const access_token = window.localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .put(
        `https://sm-todo-list.herokuapp.com/todos/${todoId}`,
        { id: todoId, task: newValue.task },
        config
      )
      .then((response) => {
        let todo = response.data.todo;
        setTodos((prev) =>
          prev.map((item) => (item.id === todoId ? todo : item))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeTodo = (todoId) => {
    const access_token = window.localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .delete(`https://sm-todo-list.herokuapp.com/todos/${todoId}`, config)
      .then(() => {
        const removedArr = [...todos].filter((todo) => todo.id !== todoId);

        setTodos(removedArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const completeTodo = (todo) => {
    const access_token = window.localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .put(
        `https://sm-todo-list.herokuapp.com/todos/${todo.id}`,
        { done:  !todo.done},
        config
      )
      .then((response) => {
        let todo = response.data.todo;
        setTodos((prev) =>
          prev.map((item) => (item.id === todo.id ? todo : item))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='todo-app'>
      <div className="mt-2"><h1 className="text-dark">Add Your Plans !</h1></div>
      <TodoForm onSubmit={addTodo} />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-0">
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      /></div>
    </div>
  );
}

export default TodoList;