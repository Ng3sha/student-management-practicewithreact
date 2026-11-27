
import { useState, useEffect } from "react";
import Addtask from "./components/Addtask";
import Stats from "./components/Stats";
import Nav from "./components/Nav";
import Timer from "./components/Timer";
import Notes from "./components/Notes";

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
      <div className="mx-auto max-w-6xl flex my-5 gap-2.5">
        <Timer />
        <Notes />
      </div>

            {/* Footer */}
      <footer className="text-center text-xs text-gray-400 mt-8">
        Stay organized. One task at a time.
      </footer>
    </div>
  );
}
