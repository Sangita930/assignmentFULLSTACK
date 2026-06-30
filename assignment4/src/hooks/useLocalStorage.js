import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue) {

  const [value, setValue] = useState(() => {

    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      return JSON.parse(savedValue);
    }

    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}