const calculateStreak = (sessions) => {
  if (!sessions || sessions.length === 0) return 0;

  // Convert session dates to unique day strings (e.g., "2025-11-03")
  const days = Array.from(
    new Set(
      sessions.map((s) => {
        const date = s.startTime ? new Date(s.startTime) : new Date(s.date);
        return date.toISOString().split("T")[0];
      })
    )
  ).sort(); // sort oldest → newest

  if (days.length === 0) return 0;

  let streak = 1;
  let currentStreak = 1;

  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1]);
    const curr = new Date(days[i]);
    const diff = (curr - prev) / (1000 * 60 * 60 * 24); // difference in days

    if (diff === 1) {
      currentStreak += 1; // consecutive day
    } else if (diff > 1) {
      currentStreak = 1; // reset streak
    }

    streak = Math.max(streak, currentStreak);
  }

  // Check if today continues the streak
  const today = new Date().toISOString().split("T")[0];
  const lastDay = days[days.length - 1];
  const diff = (new Date(today) - new Date(lastDay)) / (1000 * 60 * 60 * 24);
  if (diff > 1) currentStreak = 0; // no focus today, streak ended

  return currentStreak;
};

export default calculateStreak;