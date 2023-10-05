import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/JSX/Footer";
import Game from "./views/Game";
import Landing from "./views/Landing";
import Ranking from "./views/Ranking";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/game/:players" element={<Game />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
