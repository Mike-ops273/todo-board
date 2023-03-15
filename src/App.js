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

    // invalid destination
    if (!result.destination) return;
    //same destination and index
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    )
      return;

    // now initialize helper variables for valid moves
    let task;
    const undone = todoList;
    const done = doneList;

    // check origin and remove task
    if (result.source.droppableId === "todo-drop-zone") {
      task = undone[result.source.index];
      undone.splice(result.source.index, 1);
    } else {
      //if source id is done-drop-zone
      task = done[result.source.index];
      done.splice(result.source.index, 1);
    }

    // add task to new zone
    if (result.destination.droppableId === "todo-drop-zone") {
      undone.splice(result.destination.index, 0, task);
    } else {
      // if destination id is done-drop-zone
      done.splice(result.destination.index, 0, task);
    }

    //finally update state
    setTodoList(undone);
    setDoneList(done);

    /*
    const items = Array.from(todoList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodoList(items);
    */
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
                <div
                  className="todo-todos"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <li>example</li>
                  <ul>
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
          <Droppable droppableId="done-drop-zone">
            {(provided) => (
              <div className="board-column">
                <h2>Done</h2>
                <div
                  className="done-todos"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <li>example</li>
                  <ul>
                    {doneList.map((todo, index) => {
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
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
