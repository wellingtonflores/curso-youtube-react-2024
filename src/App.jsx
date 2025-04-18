import { useEffect, useState } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      return task;
    });
    setTasks(newTasks);
  }

  function onTaskDelete(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }),
    [tasks];

  useEffect(() => {
    async function fetchTasks() {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      setTasks(response.data);
    }

    fetchTasks();
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onTaskDelete={onTaskDelete}
        />
      </div>
    </div>
  );
}

export default App;
