import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StatsPage from "./components/StatsPage";
import Navbar from "./components/Navbar";
import FocusPage from "./components/FocusPage";
import useSessions from "./hooks/useSessions";
import { useEffect, useState } from "react";
import { paintings } from "./utils/paintings";
import SettingsPage from './components/SettingsPage';

const App = () => {
  const { sessions } = useSessions();
const completedSessions = sessions.filter(s => s.status === "Completed").length;
const rewards = Math.floor(completedSessions / 4);
 const [selectedPainting, setSelectedPainting] = useState(() => {
    // try load from localStorage, else default to first painting
    const saved = localStorage.getItem("selectedPainting");
    return saved ? JSON.parse(saved) : paintings[0];
  });

  useEffect(() => {
    if (selectedPainting) {
      localStorage.setItem("selectedPainting", JSON.stringify(selectedPainting));
    }
  }, [selectedPainting]);

  return (
    
    <Router>
      <div className="bg-bg text-fg min-h-screen transition-colors duration-500">
        {/* Navbar */}
        <Navbar rewards={rewards}/>

        {/* Main content */}
        <div className="p-6 sm:flex justify-center items-center">
          <Routes>
            <Route path="/" element={<FocusPage selectedPainting={selectedPainting} />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route
              path="/settings"
              element={
                <SettingsPage
                  selectedPainting={selectedPainting}
                  setSelectedPainting={setSelectedPainting}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
