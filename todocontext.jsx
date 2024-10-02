import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [activity, setActivity] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentUpdateId, setCurrentUpdateId] = useState(null);
  const handleAddTask = () => {
    const task = {
      id: uuidv4(),
      activity,
      status: false,
    };
    setTaskList([...taskList, task]);
    setActivity("");
  };
  const handleDeleteTask = (id) => {
    const newTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(newTaskList);
  };
  const handleEditTask = (id) => {
    const newTaskList = taskList.find((task) => task.id == id);
    setActivity(newTaskList.activity);
    setUpdate(true);
    //   setTaskList(newTaskList)
  };
  const handleUpdateTask = () => {
    const newTaskList = taskList.map((task) =>
      task.id == currentUpdateId ? { ...task, activity } : task
    );
    setActivity("");
    setUpdate(false);
    setTaskList(newTaskList);
  };

  const handleCheckbox = (id) => {
    const newTaskList = taskList.map((task) =>
        task.id == id? { ...task, status: !task.status } : task
      );

      setTaskList(newTaskList);
  };
  const allValue = {
    activity,
    setActivity,
    taskList,
    setTaskList,
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    update,
    handleUpdateTask,
    setCurrentUpdateId,
    setTaskList,
    handleCheckbox
  };
  return (
    <>
      <TodoContext.Provider value={allValue}>{children}</TodoContext.Provider>
    </>
  );
};

export { TodoContext, TodoProvider };
