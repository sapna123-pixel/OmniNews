import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SavedNews from "./pages/SavedNews";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/saved" element={<SavedNews />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;