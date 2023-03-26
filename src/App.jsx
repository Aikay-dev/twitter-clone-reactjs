import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Main />} />
        <Route path="/" element={<Navigate replace to="/Home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
