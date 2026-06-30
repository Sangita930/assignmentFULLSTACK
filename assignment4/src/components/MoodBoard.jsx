import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function MoodBoard() {

  const [moodItems, setMoodItems] = useLocalStorage("moodItems", []);
  const [input, setInput] = useState("");

  function addItem() {

    if (input.trim() === "") return;

    const newItem = {
      id: Date.now(),
      value: input,
    };

    setMoodItems([...moodItems, newItem]);
    setInput("");
  }

  function deleteItem(id) {

    const updatedItems = moodItems.filter(
      (item) => item.id !== id
    );

    setMoodItems(updatedItems);
  }

  return (
    <div>

      <h1>Mood Board</h1>

      <input
        type="text"
        placeholder="Hex color or Image URL"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addItem();
          }
        }}
      />

      <button onClick={addItem}>
        Add
      </button>

      <hr />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 120px)",
          gap: "10px",
        }}
      >

        {moodItems.map((item) => (

          <div
            key={item.id}
            onClick={() => deleteItem(item.id)}
            style={{
              width: "120px",
              height: "120px",
              cursor: "pointer",
            }}
          >

            {item.value.startsWith("#") ? (

              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: item.value,
                }}
              />

            ) : (

              <img
                src={item.value}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

            )}

          </div>

        ))}

      </div>

    </div>
  );
}