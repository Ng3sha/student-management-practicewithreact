
export default function Stats({ tasks }) {

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const percentageDone =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 my-5 max-w-6xl mx-auto">

      {/* Total Tasks */}
      <div className="bg-white border border-gray-200 rounded-xl md:p-4 p-2">
        <p className="text-sm text-gray-500">
          Total Tasks
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-2">
          {totalTasks}
        </h2>

        <p className="text-sm text-gray-400">
          Total available tasks
        </p>
      </div>

      {/* Completed Tasks */}
      <div className="bg-white border border-gray-200 rounded-xl md:p-4 p-2">
        <p className="text-sm text-gray-500">
          Completed
        </p>

        <h2 className="text-2xl font-bold text-green-600 mt-2">
          {completedTasks}
        </h2>

        <p className="text-sm text-gray-400">
          Total completed tasks
        </p>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white border border-gray-200 rounded-xl md:p-4 p-2">
        <p className="text-sm text-gray-500">
          Pending
        </p>
        <h2 className="text-2xl font-bold text-orange-500 mt-2">
          {pendingTasks}
        </h2>

        <p className="text-sm text-gray-400">
          Total pending tasks
        </p>
      </div>

      {/* Percentage Completed */}
      <div className="bg-white border border-gray-200 rounded-xl md:p-4 p-2">
        <p className="text-sm text-gray-500">
          Percentage Done
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-2">
          {percentageDone}%
        </h2>

        <p className="text-sm text-gray-400">
          Tasks completed
        </p>
      </div>

    </section>
  );
}
