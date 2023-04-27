import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Win from "./pages/Win";

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/win" element={<Win />} />
      </Routes>
    </div>
  );
}

export default App