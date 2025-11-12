import useSessions from "../hooks/useSessions";
import WeeklyFocusChart from "../components/WeeklyFocusChart";
import calculateStreak from "../utils/calculateStreak";
import { useMemo } from "react";
import { motion } from "framer-motion";

const StatsPage = () => {
  const { sessions } = useSessions();

  // Calculate total duration in seconds
  const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
  const currentStreak = useMemo(() => calculateStreak(sessions), [sessions]);
  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Rewards
  const completedSessions = sessions.filter((s) => s.status === "Completed").length;
  const rewards = Math.floor(completedSessions / 4);
  const progress = completedSessions % 4;

  return (
    <div className="w-full p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Focus Stats
      </h1>

      {sessions.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">
          No sessions recorded yet. Start your focus timer!
        </p>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-gray-800 dark:text-gray-200">Total Sessions: {sessions.length}</p>
            <p className="text-gray-800 dark:text-gray-200">
              Total Focus Time: {Math.floor(totalDuration / 60)} min {totalDuration % 60}s
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Session History
          </h2>
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {sortedSessions.map((s) => (
              <li
                key={s.id}
                className="p-3 bg-gray-200 dark:bg-gray-800 rounded-md grid grid-cols-3 hover:bg-gray-300 dark:hover:bg-gray-700 justify-between items-center"
              >
                <span className="text-left text-gray-900 dark:text-gray-100">{s.date}</span>
                <span className="text-center text-gray-900 dark:text-gray-100">{s.duration}s</span>
                <span className="italic text-right text-gray-600 dark:text-gray-400">{s.status}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
        <WeeklyFocusChart />
      </div>

      <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="text-2xl text-gray-900 dark:text-white mb-2">
          Current Focus Streak
        </h2>
        <motion.p
          className="text-4xl font-bold text-yellow-400"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8 }}
        >
          {currentStreak}🔥
        </motion.p>
      </div>

      <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg mt-6">
        <h2 className="text-2xl text-gray-900 dark:text-white mb-2">Rewards</h2>

        {/* Earned rewards */}
        <div className="flex items-center gap-2 flex-wrap mb-2">
          {Array.from({ length: rewards }).map((_, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: i * 0.1 }}
            >
              🌿
            </motion.span>
          ))}
        </div>

        {/* Progress toward next reward */}
        <div className="w-full bg-gray-400 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
          <div
            className="bg-yellow-400 h-full transition-all duration-500"
            style={{ width: `${(progress / 4) * 100}%` }}
          />
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {4 - progress} session{4 - progress !== 1 ? "s" : ""} until next reward
        </p>
      </div>
    </div>
  );
};

export default StatsPage;
