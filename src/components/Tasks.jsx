import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Tasks({ tasks, onTaskClick, onTaskDelete }) {
  const navigate = useNavigate();

  function onSeeDetailClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <div>
      <ul className="space-y-4 p-6 bg-slate-200 rounded-md">
        {tasks.map((task) => (
          <li key={task.id} className="flex gap-2">
            <button
              className={`bg-slate-400 text-left w-full text-white p-2 rounded-md ${
                task.isCompleted ? "line-through" : ""
              }`}
              onClick={() => onTaskClick(task.id)}
            >
              {task.title}
            </button>
            <Button onClick={() => onSeeDetailClick(task)}>Ver detalhes</Button>

            <Button
              onClick={() => {
                onTaskDelete(task.id);
              }}
            >
              Apagar
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
