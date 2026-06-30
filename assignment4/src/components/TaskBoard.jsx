import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import groupTasks from "../utils/groupTasks";

export default function TaskBoard() {

  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const [subtaskText, setSubtaskText] = useState("");
  const [activeParentId, setActiveParentId] = useState(null);

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const groupedTasks = groupTasks(activeTasks);

  // ---------------- TASKS ----------------

  function addTask() {
    if (title.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      dueDate: dueDate || null,
      parentId: null,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDueDate("");
  }

  function toggleTask(id) {
    const updated = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updated);
  }

  function deleteTask(id) {
    const updated = tasks.filter((task) => task.id !== id && task.parentId !== id);
    setTasks(updated);
  }

  // ---------------- EDIT ----------------

  function startEdit(task) {
    setEditId(task.id);
    setEditText(task.title);
  }

  function saveEdit() {
    const updated = tasks.map((task) =>
      task.id === editId
        ? { ...task, title: editText }
        : task
    );

    setTasks(updated);
    setEditId(null);
    setEditText("");
  }

  // ---------------- SUBTASKS ----------------

  function addSubtask(parentId) {
    if (subtaskText.trim() === "") return;

    const newSubtask = {
      id: Date.now(),
      title: subtaskText,
      completed: false,
      dueDate: null,
      parentId: parentId,
    };

    setTasks([...tasks, newSubtask]);
    setSubtaskText("");
    setActiveParentId(null);
  }

  function getSubtasks(parentId) {
    return tasks.filter((t) => t.parentId === parentId);
  }

  // ---------------- TASK UI ----------------

  function TaskItem({ task }) {

    const subtasks = getSubtasks(task.id);
    const progress =
      subtasks.length === 0
        ? 0
        : Math.round(
            (subtasks.filter((s) => s.completed).length / subtasks.length) * 100
          );

    return (
      <div style={{ marginBottom: "12px" }}>

        {/* MAIN TASK */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />

          {editId === task.id ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit();
              }}
              autoFocus
            />
          ) : (
            <span onClick={() => startEdit(task)}>
              {task.title}
              {task.dueDate && (
                <small style={{ marginLeft: "10px" }}>
                  📅 {task.dueDate}
                </small>
              )}
            </span>
          )}

          <button onClick={() => setActiveParentId(task.id)}>
            +Subtask
          </button>

          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>

        {/* PROGRESS */}
        {subtasks.length > 0 && (
          <small>
            Progress: {progress}%
          </small>
        )}

        {/* ADD SUBTASK */}
        {activeParentId === task.id && (
          <div>
            <input
              placeholder="Subtask..."
              value={subtaskText}
              onChange={(e) => setSubtaskText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addSubtask(task.id);
              }}
            />
            <button onClick={() => addSubtask(task.id)}>
              Add
            </button>
          </div>
        )}

        {/* SUBTASK LIST */}
        {subtasks.map((st) => (
          <div
            key={st.id}
            style={{
              marginLeft: "25px",
              display: "flex",
              gap: "10px",
              opacity: 0.8,
            }}
          >
            <input
              type="checkbox"
              checked={st.completed}
              onChange={() => toggleTask(st.id)}
            />

            <span>{st.title}</span>

            <button onClick={() => deleteTask(st.id)}>
              x
            </button>
          </div>
        ))}
      </div>
    );
  }

  // ---------------- UI ----------------

  return (
    <div>
      <h1>Task Board</h1>

      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button onClick={addTask}>Add</button>

      <hr />

      <h2>Today</h2>
      {groupedTasks.today.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      <h2>Upcoming</h2>
      {groupedTasks.upcoming.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      <h2>Overdue</h2>
      {groupedTasks.overdue.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      <h2>No Date</h2>
      {groupedTasks.noDate.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      <hr />

      <h2>Completed</h2>
      {completedTasks.map((task) => (
        <div key={task.id} style={{ opacity: 0.6 }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span style={{ textDecoration: "line-through" }}>
            {task.title}
          </span>
          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}