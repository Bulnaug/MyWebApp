import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BoardsPage from "./pages/BoardsPage";
import BoardPage from "./pages/BoardPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoardsPage />} />
        <Route path="/board/:id" element={<BoardPage />} />
      </Routes>
    </Router>
  );
}