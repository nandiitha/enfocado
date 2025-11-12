import { useEffect, useState } from "react";

 const useSessions = () => {
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? JSON.parse(saved) : [];
  });

  const addSession = (startTime, endTime, status = "Completed") => {
    const duration = Math.round((endTime - startTime) / 1000); // seconds
    const date = new Date(startTime).toLocaleString(); // readable date/time
    const newSession = { id: Date.now(), date, duration, status };

    console.log("🟢 Adding session:", newSession);
    setSessions((prev) => [...prev, newSession]);
  };

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  return { sessions, addSession };
};

export default useSessions;