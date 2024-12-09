import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { MyBookshelf } from './pages/MyBookshelf';
import { Browse } from './pages/Browse';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookshelf" element={<MyBookshelf />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}