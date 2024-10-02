import { useContext, useState } from "react";

import "./App.css";
import { TodoContext } from "./context/todocontext";

function Task({ task }) {
  const { handleDeleteTask, handleEditTask, setCurrentUpdateId,handleCheckbox } =
    useContext(TodoContext);
  return (
    <div className="task">
      <div>
        <input type="checkbox" checked={task.status} onChange={()=>handleCheckbox(task.id)} />
      </div>
      <div  className={task.status?"linecut":""}>{task.activity}</div>
      <div className="action">
        <button
          className="edit"
          onClick={() => {
           handleEditTask(task.id);
           setCurrentUpdateId(task.id);
          }}
        >
          Edit
        </button>
        <button 
          className="delete" 
          onClick={() => handleDeleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

function App() {
  const {
    activity,
    setActivity,
    taskList,
    handleAddTask,
    update,
    handleUpdateTask,
    setTaskList,
  } = useContext(TodoContext);

  return (
    <>
      <input value={activity} onChange={(e) => setActivity(e.target.value)} />
      <br></br>
      <div>
        {!update && <button onClick={handleAddTask}>Add Todo</button>}
        {update && <button onClick={handleUpdateTask}>Update Todo</button>}
      </div>
      <div>
        {taskList.length > 0 && taskList.map((task) => <Task task={task} />)}
      </div>

      <div>
        {taskList.length > 0 && (
          <button onClick={() => setTaskList([])}>Remove All</button>
        )}
      </div>
    </>
  );
}

export default App;
