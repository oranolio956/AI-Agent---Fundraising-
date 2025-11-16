// import React from 'react' // Not needed in React 18+
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DonatePage from './pages/DonatePage'
import ImpactPage from './pages/ImpactPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
