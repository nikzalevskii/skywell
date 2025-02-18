import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Search from "./components/Search/Search";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import History from "./components/History/History";
import Tabs from "./components/Tabs/Tabs";
import Header from "./components/Header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <BrowserRouter>
      <div className={`app ${isDarkMode ? "dark" : "light"}`}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search />
                <WeatherDisplay />
                <Tabs />
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
