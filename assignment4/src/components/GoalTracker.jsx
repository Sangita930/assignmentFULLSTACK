import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function GoalTracker() {
  const [goals, setGoals] = useLocalStorage("goals", []);
  const [title, setTitle] = useState("");

  function addGoal() {
    if (title.trim() === "") return;

const newGoal = {
  id: Date.now(),
  title: title,
  progress: 0,
  targetDate: null,
};

    setGoals([...goals, newGoal]);
    setTitle("");
  }
  function increaseProgress(id) {
  const updatedGoals = goals.map((goal) =>
    goal.id === id
      ? { ...goal, progress: Math.min(goal.progress + 10, 100) }
      : goal
  );

  setGoals(updatedGoals);
}

function decreaseProgress(id) {
  const updatedGoals = goals.map((goal) =>
    goal.id === id
      ? { ...goal, progress: Math.max(goal.progress - 10, 0) }
      : goal
  );

  setGoals(updatedGoals);
}

  return (
    <div>
      <h1>Goal Tracker</h1>

      <input
        type="text"
        placeholder="Enter goal..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addGoal();
          }
        }}
      />

      <button onClick={addGoal}>Add Goal</button>

      <hr />

     {goals.map((goal) => (
  <div
    key={goal.id}
    style={{
      border: "1px solid gray",
      padding: "10px",
      marginBottom: "10px",
    }}
  >
    <h3>{goal.title}</h3>

    <p>{goal.progress}%</p>

    <progress
      value={goal.progress}
      max="100"
      style={{ width: "200px" }}
    />

    <br />
    <br />

    <button onClick={() => decreaseProgress(goal.id)}>
      -
    </button>

    <button onClick={() => increaseProgress(goal.id)}>
      +
    </button>
  </div>
))}
    </div>
  );
}