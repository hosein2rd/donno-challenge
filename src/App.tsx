import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import List from "./pages/List";
import Detail from "./pages/Detail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/:name" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
