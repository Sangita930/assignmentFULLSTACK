import useTimer from "../hooks/useTimer";
export default function FocusTimer() {
    const {
  seconds,
  start,
  pause,
  reset,
} = useTimer();
  return (
    <div>
    <h1>Focus Timer</h1>

    <h2>
      {Math.floor(seconds / 60)}:
      {(seconds % 60).toString().padStart(2, "0")}
    </h2>

    <button onClick={start}>
      Start
    </button>

    <button onClick={pause}>
      Pause
    </button>

    <button onClick={reset}>
      Reset
    </button>
  </div>
  );
}