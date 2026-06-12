import { createContext, useContext, useState } from 'react'; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Checks local storage for token containing user data
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  // Checks local storage for  user data
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenValue);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isAdmin = user?.userRole === 'A';
  const isSeller = user?.userRole === 'S';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAdmin,   
        isSeller   
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);