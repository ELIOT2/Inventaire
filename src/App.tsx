import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-6">File Processor</h1>
          <nav className="space-y-4">
            <Link to="/" className="block text-lg hover:text-blue-400">
              Home
            </Link>
            <Link to="/analytics" className="block text-lg hover:text-blue-400">
              Analytics
            </Link>
            <Link to="/results" className="block text-lg hover:text-blue-400">
              Results
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
