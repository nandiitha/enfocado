import { useEffect, useRef, useState } from "react";
import useSessions from "./useSessions";
import useSound from "../hooks/useSound";
const useTimer = (initialTime = 1500) => {
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const { sessions,addSession } = useSessions();
const playCompleteSound = useSound("/sounds/focus-complete.mp3");

  // Restore state from localStorage
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("timeLeft");
    return saved ? Number(saved) : initialTime;
  });

  const [isRunning, setIsRunning] = useState(() => {
    return localStorage.getItem("isRunning") === "true";
  });


  // 🟢 Start timer
  const startTimer = () => {
    if (timerRef.current) return; // prevent multiple intervals
    startTimeRef.current = Date.now();
    localStorage.setItem("startTime", startTimeRef.current);
    setIsRunning(true);
    localStorage.setItem("isRunning", "true");

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem("timeLeft", newTime);

        if (newTime <= 0) {
          playCompleteSound();
          clearInterval(timerRef.current);
          timerRef.current = null;
          setIsRunning(false);
          localStorage.setItem("isRunning", "false");

          if (startTimeRef.current) {
            addSession(startTimeRef.current, Date.now(), "Completed");
            startTimeRef.current = null;
            localStorage.removeItem("startTime");
          }
          return 0;
        }
        return newTime;
      });
    }, 1000);
  };

  // 🟠 Pause timer
  const pauseTimer = () => {
    if (!isRunning) return;
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
    localStorage.setItem("isRunning", "false");

    if (startTimeRef.current) {
      addSession(startTimeRef.current, Date.now(), "Paused");
      startTimeRef.current = null;
      localStorage.removeItem("startTime");
    }
  };

  // 🔴 Reset timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
    setTimeLeft(initialTime);
    localStorage.setItem("timeLeft", initialTime);
    localStorage.setItem("isRunning", "false");
    localStorage.removeItem("startTime");
  };

  // 🧩 Persist state changes
  useEffect(() => {
    localStorage.setItem("timeLeft", timeLeft);
    localStorage.setItem("isRunning", isRunning);
  }, [timeLeft, isRunning]);

  // ⚡ Auto-resume on refresh
  useEffect(() => {
    const savedRunning = localStorage.getItem("isRunning") === "true";
    const savedTime = Number(localStorage.getItem("timeLeft"));
    const savedStart = Number(localStorage.getItem("startTime"));

    if (savedTime) setTimeLeft(savedTime);

    if (savedRunning && savedTime > 0) {
      console.log("✅ Auto-resuming timer...");
      if (savedStart) startTimeRef.current = savedStart;
      startTimer();
    }
  }, []);

  // 🧹 Cleanup
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return { isRunning, timeLeft, startTimer, pauseTimer, resetTimer, setTimeLeft };
};

export default useTimer;
