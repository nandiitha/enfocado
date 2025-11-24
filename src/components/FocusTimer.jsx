import { useEffect, useState } from "react";
import useTimer from "../hooks/useTimer";
import ProgressRing from "./ProgressRing";

const FocusTimer = ({ selectedPainting }) => {
  const { isRunning, timeLeft, startTimer, pauseTimer, resetTimer } =
    useTimer();
  const initialTime = 1500; // 25 min
  const progress = timeLeft / initialTime;
  const percentage = Math.round((1 - progress) * 100);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // ✅ correct prop fallback
  const painting = selectedPainting || null;
  console.log('painting: ', painting);
  console.log("selectedPainting: ", selectedPainting);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) pauseTimer();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pauseTimer]);
console.log("🎨 painting url:", painting?.url);
return (
  <div className="relative flex flex-col items-center justify-center">

    {/* Background layer */}
    {painting?.selectedPainting?.url && (
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${painting.selectedPainting.url})`,
         opacity: Math.min(1, (initialTime - timeLeft) / initialTime),
        filter: `blur(${(timeLeft / initialTime) * 10}px)`
       
        }}
      />
    )}

    {/* Dark overlay (optional) */}
    <div className="absolute inset-0 bg-none transition-colors duration-500" />

    {/* Timer UI */}
    <div className="relative z-10 flex flex-col items-center justify-center">

      <div className="relative gap-4  ">
        <div className="text-yellow-400 dark:text-blue-300">
          <ProgressRing radius={90} stroke={10} progress={progress} />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-mono mb-3">{formatTime(timeLeft)}</h1>
          <p className="text-lg text-blue-400 font-semibold">{percentage}%</p>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition-all shadow-md"
          onClick={isRunning ? pauseTimer : startTimer}
        >
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
  </div>
);
}

export default FocusTimer