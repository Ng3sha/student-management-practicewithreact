
import { useState, useEffect } from "react";

function formatTime(seconds) {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(
    Math.floor((seconds % 3600) / 60)
  ).padStart(2, "0");

  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${remainingSeconds}`;
}

export default function Timer() {
  const [seconds, setSeconds] = useState(() => {
    const savedTime = localStorage.getItem("reading-time");
    return savedTime ? Number(savedTime) : 0;
  });

  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem("reading-history");
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setSeconds((previousSeconds) => previousSeconds + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [running]);

  useEffect(() => {
    localStorage.setItem("reading-time", seconds);
  }, [seconds]);

  useEffect(() => {
    localStorage.setItem("reading-history", JSON.stringify(history));
  }, [history]);

  const handleStartPause = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    if (seconds === 0) return;

    const newReading = {
      id: Date.now(),
      time: seconds,
      date: new Date().toLocaleString()
    };

    setHistory((previousHistory) => [
      newReading,
      ...previousHistory
    ]);
    setRunning(false);
    setSeconds(0);
  };

  const handleDelete = (id) => {
    setHistory((previousHistory) =>
      previousHistory.filter((reading) => reading.id !== id)
    );
  };

  const handleClearHistory = () => {
    if (window.confirm("Delete all reading history?")) {
      setHistory([]);
    }
  };

  return (
    <section className="w-full max-w-md mt-2.5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

      {/* Timer heading */}
      <h2 className="text-sm font-medium text-gray-500">
        Study Timer
      </h2>

      {/* Display current time */}
      <p className="mt-3 text-5xl font-semibold tabular-nums text-[#071d1b]">
        {formatTime(seconds)}
      </p>

      {/* Timer status */}
      <p className="mt-2 text-xs text-gray-400">
        {running
          ? "Timer running"
          : seconds > 0
          ? "Paused"
          : "Ready to start"}
      </p>

      {/* Timer buttons */}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={handleStartPause}
          className={`flex-1 rounded-lg bg-[#001d1b]  py-3 text-sm font-medium text-white transition ${
            running
              ? "bg-red-600 hover:bg-red-700"
              : "bg-[#001d1b] hover:bg-[#173b37]"
          }`}
        >
          {running
            ? "Pause"
            : seconds > 0
            ? "Resume"
            : "Start"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={seconds === 0}
          className="rounded-lg border border-gray-200 px-5 py-3 text-sm text-gray-600 disabled:opacity-40"
        >
          Reset
        </button>
      </div>

      {/* Reading history */}
      <div className="mt-8 border-t border-gray-100 pt-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">
            Previous Reading Times
          </h3>
          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClearHistory}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Clear History
            </button>
          )}
        </div>

        {/* Show message if history is empty */}
        {history.length === 0 ? (

          <p className="text-sm text-gray-400">
            No previous reading times yet.
          </p>

        ) : (
          <div className="space-y-3">
            {history.map((reading) => (
              <div
                key={reading.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div>
                  <p className="text-lg font-semibold text-[#071d1b]">
                    {formatTime(reading.time)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {reading.date}
                  </p>
                </div>
                {/* Delete individual reading */}
                <button
                  type="button"
                  onClick={() => handleDelete(reading.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
