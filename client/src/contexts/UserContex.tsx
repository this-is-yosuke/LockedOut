import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of your user data
interface User {
  username: string | null;
  token: string | null;
}

// Create a Context with default values
export const UserContext = createContext<{
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}>( {
  user: null,
  login: () => {},
  logout: () => {},
});

// Create a Provider component to wrap your app and provide the context
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user data from localStorage when the app starts
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user)); // Persist the user to localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from localStorage on logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);