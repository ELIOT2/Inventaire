import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { FileProvider } from "./context/FileContext";
import Home from "./pages/Home";
import ResultsPage from "./pages/ResultsPage";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Loader2 } from "lucide-react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <FileProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/home"
            element={
              isAuthenticated ? <Home /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/results"
            element={
              isAuthenticated ? <ResultsPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/analytics"
            element={
              isAuthenticated ? (
                <AnalyticsDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  Page Not Found
                </h1>
              </div>
            }
          />
        </Routes>
      </Router>
    </FileProvider>
  );
}

export default App;