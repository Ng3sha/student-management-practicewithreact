
import { useState } from "react";
import Button from "./Button";

export default function Addtask({ tasks, setTasks, search }) {
  const priorities = ["high", "medium", "low"];

  const [filter, setFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [title, setTitle] = useState ("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    if (editingId !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingId
            ? {
                ...task,
                text: trimmedTitle,
                title: title.trim(),
                description: description.trim(),
                priority: priority,
              }
            : task
        )
      );

      setEditingId(null);
    } else {
      const newTask = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        priority: priority,
        completed: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  // Delete Task
  const deleteTask = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );

    if (editingId === id) {
      cancelEdit();
    }
  };

  // Edit Task
  const editTask = (task) => {
    setTitle(task.title || task.text || "");
    setDescription(task.description || "");
    setPriority(task.priority || "medium");
    setEditingId(task.id);
  };

  // Mark Task as Completed
  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Cancel Editing
  const cancelEdit = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
    setEditingId(null);
  };

  // Filter Tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filter === "All" ||
      (filter === "Completed" && task.completed) ||
      (filter === "Pending" && !task.completed);

    const matchesPriority =
      priorityFilter === "All" ||
      (task.priority || "medium") === priorityFilter;

        const matchesSearch =
      (task.title || "")
        .toLowerCase()
        .includes((search || "").toLowerCase().trim());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto">

      {/* Add Task Section */}
      <section className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row justify-between gap-5"
        >

          {/* Title and Description */}
          <div className="flex flex-col gap-4 flex-1">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {editingId !== null ? "Edit Title" : "Add a New Title"}
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add task title"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {editingId !== null
                  ? "Edit Description"
                  : "Add a New Description"}
              </label>

              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-gray-500"
              />
            </div>

          </div>

          {/* Priority and Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-40 lg:justify-end">

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-3 bg-white text-sm text-gray-700 outline-none focus:border-gray-500"
            >
              {priorities.map((item) => (
                <option key={item} value={item}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </option>
              ))}
            </select>

            <Button type="submit" disabled={!title.trim() || !description.trim()}>
              {editingId !== null ? "Update" : "Add Task"}
            </Button>

            {editingId !== null && (
              <Button type="button" onClick={cancelEdit}>
                Cancel
              </Button>
            )}

          </div>
        </form>
      </section>

      {/* Tasks Section */}
      <section className="bg-white border border-gray-200 rounded-xl p-5">

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Tasks List
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-5">
          {/* Status Filters */}
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 mb-2">
              FILTER BY STATUS
            </p>
            <div className="flex flex-wrap gap-2">
              {["All", "Completed", "Pending"].map((item) => (
                <Button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                >
                  <span className={filter === item ? "font-semibold" : ""}>
                    {item}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Priority Filters */}
          <div className="mb-5">
            <p className="text-xs font-medium text-gray-500 mb-2">
              FILTER BY PRIORITY
            </p>
            <div className="flex flex-wrap gap-2">
              {["All", ...priorities].map((item) => (
                <Button
                  key={item}
                  type="button"
                  onClick={() => setPriorityFilter(item)}
                >
                  <span className={
                    priorityFilter === item ? "font-semibold" : ""
                  }>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">
              {tasks.length === 0
                ? "No tasks yet. Add your first task!"
                : "No tasks found with these filters."}
            </p>
          </div>

        ) : (

          <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl px-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4"
              >
                {/* Task Information */}
                <div className="flex items-start gap-3 min-w-0">
                  <div className="min-w-0">

                    <p className={`text-sm wrap-break-word ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}>
                      {task.title}
                    </p>

                    {task.description && (
                      <p className="text-sm text-gray-500 mt-1 wrap-break-word">
                        {task.description}
                      </p>
                    )}

                    <span className="inline-block mt-2 text-xs text-gray-500 bg-gray-100 rounded-md px-2 py-1">
                      {task.priority || "medium"}
                    </span>

                  </div>
                </div>

                {/* Task Actions */}
                <div className="flex gap-2 sm:shrink-0">
                  <button
                      onClick={() => toggleComplete(task.id)}
                      className={`rounded-md hover:bg-green-700 hover:text-white border cursor-pointer  ${
                        task.completed
                          ? "bg-gray-100 border-gray-200 text-gray-700"
                          : ""
                      }`}
                    >
                      {task.completed && (
                        <span className="text-gray-700 text sm px-5">completed</span>
                      )}
                  </button>

                  <Button
                    type="button"
                    onClick={() => editTask(task)}
                    className="hover:bg-gray-700"
                  >
                    Edit
                  </Button>

                  <Button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    className="hover:bg-red-700"
                  >
                    Delete
                  </Button>

                </div>
              </div>
            ))}

          </div>
        )}
      </section>

    </div>
  );
}
