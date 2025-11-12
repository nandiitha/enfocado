import React, { useMemo } from "react";
import  useSessions  from "../hooks/useSessions";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

/**
 * WeeklyFocusChart
 * - reads sessions from useSessions()
 * - aggregates total duration (seconds) per day for last 7 days
 * - renders a responsive Recharts BarChart (minutes)
 */

const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const getLastNDays = (n) => {
  const days = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    days.push(d);
  }
  return days;
};

const WeeklyFocusChart = ({ days = 7 }) => {
  const { sessions } = useSessions();

  // aggregate durations per day (in seconds)
  const data = useMemo(() => {
    const lastDays = getLastNDays(days);
    const map = new Map(lastDays.map(d => [d.toDateString(), 0]));

    sessions.forEach(s => {
      // sessions store the readable date string in `date` — prefer timestamp if available
      // try to parse either s.startTime or s.date
      const ts = s.startTime ? Number(s.startTime) : Date.parse(s.date);
      if (!ts) return;
      const d = new Date(ts).toDateString();
      if (map.has(d)) map.set(d, map.get(d) + (s.duration || 0));
    });

    // map -> array for recharts, convert seconds -> minutes (or keep seconds)
    return lastDays.map(d => {
      const secs = map.get(d.toDateString()) || 0;
      return {
        day: DAY_NAMES[d.getDay()],
        minutes: Math.round(secs / 60), // display in minutes
        seconds: secs,
      };
    });
  }, [sessions, days]);

  return (
    <div className="w-full h-64 bg-gray-900 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-0.8">Weekly Focus (minutes)</h3>
      <ResponsiveContainer width="100%" height="100%" aspect={undefined}>
        <BarChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: "#cbd5e1" }}  />
          <YAxis tick={{ fill: "#cbd5e1" }} />
          <Tooltip formatter={(value, name) => [`${value} min`, name]}
  cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
  contentStyle={{
    backgroundColor: "rgba(31, 41, 55, 0.9)", // Tailwind gray-800
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    color: "#f8fafc", // text-slate-50
  }}
  labelStyle={{ color: "#94a3b8" }} // text-slate-400 
  />
          <Bar
  dataKey="minutes"
  fill="#60a5fa"
  radius={[6, 6, 0, 0]}
  barSize={100}
  animationDuration={800}
  animationEasing="ease-out"
/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyFocusChart;
