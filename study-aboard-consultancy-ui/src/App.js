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
import Loans from "./pages/admin/loans/Loans";
import MedicalInsurance from "./pages/admin/medicalInsurance/MedicalInsurance";
import AdminCourses from "./pages/admin/courses/AdminCourses";
import BroadCast from "./pages/admin/broadcast/BroadCast";
import StudentApplication from "./pages/admin/studentapplications/StudentApplication";
import StudentList from "./pages/admin/studentlist/StudentList";
import Documents from "./pages/admin/documents/Documents";
import UniversatyList from "./pages/student/universaty/University";
import StudentApplicationsList from "./pages/student/applicationslist/StudentApplicationList";
import StudentMedicalInsurance from "./pages/student/medical-insurance/StudentMedical-insurance";
import DocumentUpload from "./pages/student/documents/DocumentsUpload";
import StudentBroadCast from "./pages/student/studentbroadcast/StudentBroadCast";
import StudentLoan from "./pages/student/studentloan/StudentLoan";

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
          <Route element={<ProtectedRoute role="Admin" />}>
            <Route path="/admin-courses" element={<AdminCourses />} />
          </Route>
          <Route element={<ProtectedRoute role="Admin" />}>
            <Route path="/loans" element={<Loans />} />
          </Route>
          <Route element={<ProtectedRoute role="Admin" />}>
            <Route path="/medical-insurance" element={<MedicalInsurance />} />
          </Route>
          <Route element={<ProtectedRoute role="Admin" />}>
            <Route path="/broadcast" element={<BroadCast />} />
          </Route>
          <Route element={<ProtectedRoute role="Admin" />}>
            <Route path="/documents" element={<Documents />} />
          </Route>
          <Route element={<ProtectedRoute role="Admin" />}>
            <Route
              path="/student-application"
              element={<StudentApplication />}
            />
          </Route>
          <Route element={<ProtectedRoute role="Admin" />}>
            <Route path="/student-list" element={<StudentList />} />
          </Route>
          <Route element={<ProtectedRoute role="Student" />}>
            <Route path="/studentdashboard" element={<UniversatyList />} />
          </Route>
          <Route element={<ProtectedRoute role="Student" />}>
            <Route path="/student-courses" element={<AdminCourses />} />
          </Route>
          <Route element={<ProtectedRoute role="Student" />}>
            <Route
              path="/applications-list"
              element={<StudentApplicationsList />}
            />
          </Route>
          <Route element={<ProtectedRoute role="Student" />}>
            <Route
              path="/student-medicallist"
              element={<StudentMedicalInsurance />}
            />
          </Route>
          <Route element={<ProtectedRoute role="Student" />}>
            <Route path="/document-upload" element={<DocumentUpload />} />
          </Route>
          <Route element={<ProtectedRoute role="Student" />}>
            <Route path="/student-broadcast" element={<StudentBroadCast />} />
          </Route>
          <Route element={<ProtectedRoute role="Student" />}>
            <Route path="/student-loan" element={<StudentLoan />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
