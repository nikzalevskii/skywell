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
import { APP_THEME_CLASS } from "./constants/theme";
import { TabType } from "./types/tabs.type";
import { TABS } from "./constants/tabs";
import { LOCAL_STORAGE_KEYS } from "./constants/localStorageKeys";

function App() {
  const isPurpleMode = useSelector(
    (state: RootState) => state.theme.isPurpleMode
  );
  const loadActiveTabFromLocalStorage = (): TabType => {
    const storedTab = localStorage.getItem(LOCAL_STORAGE_KEYS.ACTIVE_TAB);
    return storedTab ? (storedTab as TabType) : TABS.THREE_DAYS;
  };

  const [activeTab, setActiveTab] = useState<TabType>(
    loadActiveTabFromLocalStorage()
  );

  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div
        className={`app ${
          isPurpleMode ? APP_THEME_CLASS.PURPLE : APP_THEME_CLASS.LAGOON
        }`}
      >
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
