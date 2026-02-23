import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // اعتبارسنجی توکن
      setUser({ username: 'admin' });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // در حالت واقعی، اینجا درخواست به سرور می‌زنید
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminToken', 'dummy-token');
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};