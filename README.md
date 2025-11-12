# ⏱️ Enfocado — Minimal Focus Timer App

> Stay focused, track your progress, and grow your streak 🌱

A beautifully simple **React-based focus timer** that helps you build consistency, track focus sessions, and stay motivated with streaks and rewards.

![App Screenshot](./screenshots/focusflow-dashboard.png)

---

## ✨ Features

✅ **Pomodoro-style Timer** – Stay productive in focused bursts.  
✅ **Session History** – Automatically logs every focus session.  
✅ **Weekly Focus Chart** – Visualizes your total focus time per day.  
✅ **Focus Streak 🔥** – Track your consistency day by day.  
✅ **Reward System 🍀** – Earn a clover after every 4 completed sessions.  
✅ **Light / Dark Mode** – Seamless theme switching.  
✅ **Sound Alerts** – Plays a chime when a session completes.  
✅ **Optional Browser Notifications** – Get a reminder even when you switch tabs.

---

## 🖼️ Screenshots

| Focus Timer | Stats Dashboard | Rewards |
|--------------|----------------|----------|
| ![Focus Timer](./screenshots/focus-timer.png) | ![Stats Dashboard](./screenshots/stats-page.png) | ![Rewards](./screenshots/reward-system.png) |

> 💡 Tip: place your screenshots in a `/screenshots` folder inside the root directory.

---

## ⚙️ Tech Stack

- **React 18**
- **Tailwind CSS**
- **Framer Motion** – smooth animations
- **Recharts** – data visualization
- **Lucide Icons** – clean, lightweight icons
- **LocalStorage** – persistent state across reloads
- **Custom Hooks** (`useTimer`, `useSessions`, `useSound`) for modular logic

---

## 🚀 Getting Started

1️⃣ Clone the repository
```bash
git clone https://github.com/nandiitha/enfocado.git
cd enfocado

2️⃣ Install dependencies
npm install

3️⃣ Start the development server
npm run dev

4️⃣ Build for production
npm run build