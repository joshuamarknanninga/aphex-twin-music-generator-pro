import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import Home from './pages/Home';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Dashboard from './pages/Dashboard';
import ProjectPage from './pages/ProjectPage';
import { AuthProvider } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/project/:id" element={<ProjectPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
