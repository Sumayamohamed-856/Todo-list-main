import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import {MdOutlineDoneAll} from 'react-icons/md';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });
  const submitUpdate = value => {
    updateTodo(edit.id, value); 
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div key={todo.id} className="col">
      <div className="card h-100">
        <div className="card-header">
          TODO Item
        </div>
        <div className="card-body p-0">
          <div className={"card-text fs-5 " +  ( todo.done ? "text-decoration-line-through" : "")}  key={index}>
            <div  onClick={() => completeTodo(todo)}>
              {todo.task}
            </div>
          </div>
          
        </div>
        <div className="card-footer">
            <div className="icons d-flex justify-content-center">
              <RiCloseCircleLine
                onClick={() => removeTodo(todo.id)}
                className="delete-icon"
                data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete TODO"
              />
              <TiEdit
                onClick={() => setEdit({ id: todo.id, value: todo.task })}
                className="edit-icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit TODO"
              />
              <MdOutlineDoneAll onClick={() => completeTodo(todo)} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Mark as Done"
                className="done-icon"/>
            </div>
          </div>
      </div>
    </div>
  ));
};

export default Todo;