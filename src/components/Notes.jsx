import { useState, useEffect } from "react";

const loadNotes = (key) => {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const makeId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

export default function Notes({ storageKey = "reading-notes" }) {
  const [notes, setNotes] = useState(() => loadNotes(storageKey));
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(notes));
    } catch {
      // notes are saved whenever a new note is added
    }
  }, [notes, storageKey]);

  const handleAdd = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const now = new Date().toISOString();
    setNotes([{ id: makeId(), text, createdAt: now, updatedAt: now }, ...notes]);
    setDraft("");
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = (id) => {
    const text = editText.trim();
    if (!text) return;

    setNotes(
      notes.map((n) =>
        n.id === id ? { ...n, text, updatedAt: new Date().toISOString() } : n
      )
    );
    cancelEdit();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this note?")) return;
    setNotes(notes.filter((n) => n.id !== id));
    if (editingId === id) cancelEdit();
  };

  return (
    <section className="w-full max-w-full mt-2.5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-medium text-gray-500">Notes</h2>

      {/* ADD NOTE */}
      <form onSubmit={handleAdd} className="mt-3 space-y-3">
        <label htmlFor="new-note" className="sr-only">
          New note
        </label>

        <textarea
          id="new-note"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a note about what you're reading..."
          rows={3}
          className="w-full resize-y rounded-lg border border-gray-200 p-4 text-sm outline-none transition focus:border-[#001d1b]"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="rounded-lg bg-[#001d1b] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#173b37] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save note
        </button>
      </form>

      {/* NOTES LIST */}
      {notes.length === 0 ? (
        <p className="mt-8 text-sm text-gray-400">
          No notes yet. Add your first one above.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {notes.map((note) => (
            <li
              key={note.id}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              {editingId === note.id ? (
                <div className="space-y-3">
                  <label htmlFor={`edit-${note.id}`} className="sr-only">
                    Edit note
                  </label>

                  <textarea
                    id={`edit-${note.id}`}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={4}
                    autoFocus
                    className="w-full resize-y rounded-lg border border-gray-200 p-3 text-sm outline-none transition focus:border-[#001d1b]"
                  />

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => saveEdit(note.id)}
                      disabled={!editText.trim()}
                      className="rounded-lg bg-[#001d1b] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#173b37] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Save changes
                    </button>

                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="rounded-lg border border-gray-200 px-4 py-2 text-xs text-gray-600 transition hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-[#071d1b]">
                    {note.text}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-xs text-gray-400">
                      {note.updatedAt !== note.createdAt
                        ? `Edited ${formatDate(note.updatedAt)}`
                        : formatDate(note.createdAt)}
                    </p>

                    <div className="flex gap-3 text-xs">
                      <button
                        type="button"
                        onClick={() => startEdit(note)}
                        className="text-[#001d1b] hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(note.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}