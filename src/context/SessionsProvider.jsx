import { createContext, useContext, useState, useEffect } from "react";

// 1️⃣ Create the context
const SessionsContext = createContext();

// 2️⃣ Provider component
export const SessionsProvider = ({ children }) => {
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? JSON.parse(saved) : [];
  });

  // Function to add a new session
  const addSession = (startTime, endTime, status = "Completed") => {
    const duration = Math.round((endTime - startTime) / 1000); // seconds
    const date = new Date(startTime).toLocaleString();          // readable date/time
    const newSession = { id: Date.now(), date, duration, status };

    setSessions((prev) => [...prev, newSession]);
  };

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  return (
    <SessionsContext.Provider value={{ sessions, addSession }}>
      {children}
    </SessionsContext.Provider>
  );
};

// 3️⃣ Custom hook to use sessions
export const useSessions = () => {
  const context = useContext(SessionsContext);
  if (!context) {
    throw new Error("useSessions must be used within a SessionsProvider");
  }
  return context;
};
