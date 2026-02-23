import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // اگه در صفحه اصلی هستیم، نوار رو نشون نده
  const isHomePage = location.pathname === '/';

  // مخفی کردن نوار هنگام اسکرول به پایین (فقط برای صفحات غیر اصلی)
  useEffect(() => {
    if (isHomePage) return; // اگه صفحه اصلی هست، اسکرول رو نادیده بگیر

    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false); // اسکرول به پایین -> مخفی کن
      } else {
        setIsVisible(true); // اسکرول به بالا -> نشون بده
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, isHomePage]);

  // اگه صفحه اصلی هست، نوار رو نشون نده
  if (isHomePage) {
    return null;
  }

  // اسکرول نرم به بخش‌های مختلف
  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    
    // اگه صفحه اصلی نیستیم، اول بریم به صفحه اصلی
    if (location.pathname !== '/') {
      navigate('/');
      // صبر کنیم تا صفحه لود بشه بعد اسکرول کنه
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // اگه تو صفحه اصلی هستیم، مستقیم اسکرول کن
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* لوگو */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ZM
          </Link>

          {/* لینک‌های دسکتاپ - با اسکرول نرم */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('about')} className="hover:text-purple-400 transition">خانه</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-purple-400 transition">مهارت‌ها</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-purple-400 transition">پروژه‌ها</button>
            <button onClick={() => scrollToSection('certificates')} className="hover:text-purple-400 transition">گواهی‌ها</button>
            
            {user ? (
              <>
                <Link to="/admin" className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                  پنل مدیریت
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600/20 border border-red-600 rounded-lg hover:bg-red-600/30 transition"
                >
                  خروج
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
              >
                ورود
              </Link>
            )}
          </div>

          {/* دکمه منوی موبایل */}
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* منوی موبایل */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-white/10"
          >
            <div className="flex flex-col gap-3">
              <button onClick={() => scrollToSection('about')} className="text-right px-4 py-2 hover:bg-white/10 rounded-lg transition">خانه</button>
              <button onClick={() => scrollToSection('skills')} className="text-right px-4 py-2 hover:bg-white/10 rounded-lg transition">مهارت‌ها</button>
              <button onClick={() => scrollToSection('projects')} className="text-right px-4 py-2 hover:bg-white/10 rounded-lg transition">پروژه‌ها</button>
              <button onClick={() => scrollToSection('certificates')} className="text-right px-4 py-2 hover:bg-white/10 rounded-lg transition">گواهی‌ها</button>
              
              {user ? (
                <>
                  <Link to="/admin" className="block px-4 py-2 bg-purple-600 rounded-lg text-center hover:bg-purple-700 transition">
                    پنل مدیریت
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600/20 border border-red-600 rounded-lg hover:bg-red-600/30 transition"
                  >
                    خروج
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="block px-4 py-2 bg-purple-600 rounded-lg text-center hover:bg-purple-700 transition"
                >
                  ورود
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;