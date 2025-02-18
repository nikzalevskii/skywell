import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Search from "./components/Search/Search";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import History from "./components/History/History";
import Tabs from "./components/Tabs/Tabs";
import Header from "./components/Header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";

function App() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const loadActiveTabFromLocalStorage = (): "3days" | "7days" | "14days" => {
    const storedTab = localStorage.getItem("activeTab");
    return storedTab ? (storedTab as "3days" | "7days" | "14days") : "3days";
  };

  const [activeTab, setActiveTab] = useState<"3days" | "7days" | "14days">(
    loadActiveTabFromLocalStorage()
  );

  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div className={`app ${isDarkMode ? "dark" : "light"}`}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search activeTab={activeTab} setActiveTab={setActiveTab} />
                <WeatherDisplay />
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
              </>
            }
          />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
