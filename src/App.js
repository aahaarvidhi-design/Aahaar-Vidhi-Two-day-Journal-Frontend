import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Home from "./pages/Home";

import Assessment from "./pages/assessment/Assessment";
import AssessmentResult from "./pages/assessment/AssessmentResult";

import JournalHome from "./pages/journal/JournalHome";
import JournalQuestions from "./pages/journal/JournalQuestions";
import JournalHistory from "./pages/journal/JournalHistory";

import Dashboard from "./pages/admin/Dashboard";
import StudyResponses from "./pages/admin/StudyResponses";
import Questions from "./pages/admin/Questions";
import Journals from "./pages/admin/Journals";
import Users from "./pages/admin/Users";
import Reports from "./pages/admin/Reports";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={
              localStorage.getItem("token")
                ? <Navigate to="/home" replace />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/assessment"
            element={
              <ProtectedRoute>
                <Assessment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <AssessmentResult />
              </ProtectedRoute>
            }
          />

          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <JournalHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/journal/questions/:journalId"
            element={
              <ProtectedRoute>
                <JournalQuestions />
              </ProtectedRoute>
            }
          />

          <Route
            path="/journal/history"
            element={
              <ProtectedRoute>
                <JournalHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/study-responses"
            element={
              <AdminRoute>
                <StudyResponses />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/questions"
            element={
              <AdminRoute>
                <Questions />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/journals"
            element={
              <AdminRoute>
                <Journals />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/reports"
            element={
              <AdminRoute>
                <Reports />
              </AdminRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;