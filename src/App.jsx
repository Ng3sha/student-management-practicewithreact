
import { useState, useEffect } from "react";
import Addtask from "./components/Addtask";
import Stats from "./components/Stats";
import Nav from "./components/Nav";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

   const [search, setSearch] = useState("");
  
  return (
    <div className="max-w-full mx-auto">
      <Nav search={search} setSearch={setSearch}/>
      <Stats tasks={tasks} />
      <Addtask
        tasks={tasks}
        setTasks={setTasks}
        search={search}
      />

    </div>
  );
}
