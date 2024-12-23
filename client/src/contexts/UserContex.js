import React, { createContext, useContext, useState, useEffect } from 'react';
// Create a Context with default values
export const UserContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
});
// Create a Provider component to wrap your app and provide the context
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // Load user data from localStorage when the app starts
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);
    const login = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user)); // Persist the user to localStorage
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove user data from localStorage on logout
    };
    return (<UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>);
};
// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
