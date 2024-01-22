import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/App.css";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JobsPage />} />
          <Route path="*" element={<NotFoundPage />} />{" "}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
