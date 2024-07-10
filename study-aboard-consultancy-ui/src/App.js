import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import { AuthProvider } from "./utilities/AuthProvider";
import ProtectedRoute from "./utilities/ProtectedRoute";
import Universaty from "./pages/admin/universaties/Universaty";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/why-us" element={<div>Why us</div>} />
          <Route path="/feature" element={<div>Feature</div>} />
          <Route element={<div>Not Found</div>} />

          <Route element={<ProtectedRoute role="Admin" />}>
            <Route path="/admindashboard" element={<Universaty />} />
          </Route>
          <Route element={<ProtectedRoute role="Student" />}>
            <Route path="/studentdashboard" element={<div>Student</div>} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
