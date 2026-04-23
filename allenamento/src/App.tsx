import { Routes, Route } from "react-router-dom";
import { Home } from "./assets/Scegli";
import { Game } from "./assets/Game";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:size" element={<Game />} />
    </Routes>
  );
}

export default App;