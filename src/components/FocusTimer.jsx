import { useEffect, useState} from "react";
import useTimer from "../hooks/useTimer";
import { motion } from "framer-motion";
import ProgressRing from "./ProgressRing";

const FocusTimer = () => {
  const { isRunning, timeLeft, startTimer, pauseTimer, resetTimer } = useTimer();
    const initialTime = 1500; 
 const progress = timeLeft / initialTime;
 const percentage = Math.round((1-progress) * 100);
  //format time to MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

// const messages = [
//     "Stay focused — you’re doing amazing! 💪",
//     "Deep focus leads to deep results. 🔥",
//     "You’re one step closer to your goal! 🌟",
//     "Focus now, shine later. 💫",
//     "Every second of focus counts. 🧠",
//     "Keep going — success is near! 🚀",
//   ];

  // const [message, setMessage] = useState(messages[0]);
//   useEffect(() => {
//   if (!isRunning) return;
//   const interval = setInterval(() => {
//     const randomIndex = Math.floor(Math.random() * messages.length);
//     setMessage(messages[randomIndex]);
//   }, 300000); // change every 5 minutes (300,000 ms)

//   return () => clearInterval(interval);
// }, [isRunning]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) pauseTimer();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 ">
    {/* 🟢 ProgressRing wrapper */}
      <div className="relative">
        <div className="text-yellow-400 dark:text-blue-300">
          <ProgressRing radius={90} stroke={10} progress={progress} /> {/* 🟢 ring */}
        </div>

        {/* 🟢 Timer text inside ring */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">

      <h1 className="text-5xl font-mono mb-3 ">{formatTime(timeLeft)}</h1>
        <p className="text-lg text-blue-400 font-semibold">{percentage}%</p> {/* 🟢 percentage here */}
        </div>
         </div>
      {/* <motion.p
  key={message} // triggers animation when message changes
  className="text-xl text-white-400 italic mt-6"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {message}
</motion.p> */}
      <div className="flex gap-4">
        <button
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition-all shadow-md"
          onClick={isRunning ? pauseTimer : startTimer}
        >
          {" "}
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl transition-all shadow-md"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
export default FocusTimer;
