import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SavedNews from "./pages/SavedNews";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/saved" element={<SavedNews />} />
    </Routes>
  );
}

export default App;