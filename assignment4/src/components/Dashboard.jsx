import useLocalStorage from "../hooks/useLocalStorage";
import TaskBoard from "./TaskBoard";
import GoalTracker from "./GoalTracker";
import FocusTimer from "./FocusTimer";
import MoodBoard from "./MoodBoard";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useLocalStorage(
  "activeSection",
  "tasks"
);

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          backgroundColor: "#222",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>Cipher</h2>

        <button onClick={() => setActiveSection("tasks")}>
          Tasks
        </button>

        <br /><br />

        <button onClick={() => setActiveSection("goals")}>
          Goals
        </button>

        <br /><br />

        <button onClick={() => setActiveSection("focus")}>
          Focus Timer
        </button>

        <br /><br />

        <button onClick={() => setActiveSection("mood")}>
          Mood Board
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        {activeSection === "tasks" && <TaskBoard />}
        {activeSection === "goals" && <GoalTracker />}
        {activeSection === "focus" && <FocusTimer />}
        {activeSection === "mood" && <MoodBoard />}
      </div>

    </div>
  );
}