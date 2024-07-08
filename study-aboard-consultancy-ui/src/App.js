import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="d-flex justify-content-center">Navbar</div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="d-flex justify-content-center">Landing Page</div>
          }
        />
        <Route path="/why-us" element={<div>Why us</div>} />
        <Route path="/feature" element={<div>Feature</div>} />
        <Route element={<div>Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
