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

  function handleOnDragEnd(result) {
    console.log(result);
    if (!result.destination) return;
    const items = Array.from(todoList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodoList(items);
  }

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
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="todos-container">
          <Droppable droppableId="todo-drop-zone">
            {(provided) => (
              <div className="board-column">
                <h2>To Do</h2>
                <div className="todo-todos">
                  <li>example</li>
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {todoList.map((todo, index) => {
                      return (
                        <Draggable
                          key={todo.id}
                          draggableId={todo.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="note"
                            >
                              {todo.todo}
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                </div>
              </div>
            )}
          </Droppable>
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
