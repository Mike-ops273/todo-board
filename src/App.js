import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./App.css";

function App() {
  // state hooks
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  // helper functions
  const addTodo = () => {
    if (!todo) {
      alert("Enter a todo item");
    }
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      todo: todo,
      isDone: false,
    };
    setTodoList((todoList) => [...todoList, newTodo]);
    console.log(newTodo);
    setTodo("");
  };

  // render
  return (
    <div className="App">
      <header>
        <h1>To Do Board</h1>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="To do..."
            name="todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button onClick={() => addTodo()}>Add</button>
        </div>
        {todo}
      </header>
      <DragDropContext>
        <div className="todos-container">
          <div className="board-column">
            <h2>To Do</h2>
            <div className="todo-todos">
              <li>example</li>
              <ul>
                {todoList.map((todo) => {
                  return (
                    <li className="note" key={todo.id}>
                      {todo.todo}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="board-column">
            <h2>Done</h2>
            <div className="done-todos">
              <li>example</li>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
