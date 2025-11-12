import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StatsPage from "./components/StatsPage";
import Navbar from "./components/Navbar";
import FocusPage from "./components/FocusPage";
import useSessions from "./hooks/useSessions";

const App = () => {
  const { sessions } = useSessions();
const completedSessions = sessions.filter(s => s.status === "Completed").length;
const rewards = Math.floor(completedSessions / 4);
  return (
    <Router>
      <div className="bg-bg text-fg min-h-screen transition-colors duration-500">
        {/* Navbar */}
        <Navbar rewards={rewards}/>

        {/* Main content */}
        <div className="p-6 sm:flex justify-center items-center">
          <Routes>
            <Route path="/" element={<FocusPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route
              path="/settings"
              element={<p className="text-gray-400">Settings coming soon ⚙️</p>}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
