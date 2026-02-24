import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Background from './components/Layout/Background';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import SyncPage from './pages/SyncPage';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen relative text-white">
            <Background />
            <Navbar />
            <main className="container mx-auto px-4 py-8 relative z-10 pt-20">
              <Routes>
                {/* مسیرهای اصلی */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                
                {/* مسیرهای مخفی و همگام‌سازی */}
                <Route path="/secret-admin" element={<LoginPage />} />
                <Route path="/sync" element={<SyncPage />} />
                
                {/* مسیر پیش‌فرض برای صفحات پیدا نشده - هدایت به صفحه اصلی */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;