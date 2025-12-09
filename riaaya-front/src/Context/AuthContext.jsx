import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext({
    isLoggedIn: false,
    authToken: null,
    user: null,
    login: () => { },
    logout: () => { }
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize from localStorage after component mounts
    useEffect(() => {
        try {
            const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
            const storedToken = localStorage.getItem("authToken");
            const storedUser = localStorage.getItem("user");

            if (storedIsLoggedIn === "true" && storedToken) {
                setIsLoggedIn(true);
                setAuthToken(JSON.parse(storedToken));
                setUser(storedUser ? JSON.parse(storedUser) : null);
            }
        } catch (error) {
            console.error("Error reading from localStorage:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (authData) => {
        try {
            setIsLoggedIn(true);
            setAuthToken(authData?.accessToken);
            setUser(authData?.user);
            
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("authToken", JSON.stringify(authData?.accessToken));
            localStorage.setItem("user", JSON.stringify(authData?.user));
        } catch (error) {
            console.error("Error during login:", error);
        }
    }

    const logout = () => {
        setIsLoggedIn(false);
        setAuthToken(null);
        setUser(null);
        
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
    }

    // Auto logout after ~23 hours
    useEffect(() => {
        if (!authToken) return;

        const interval = setInterval(() => {
            logout();
        }, 82800000); // 23 hours

        return () => clearInterval(interval);
    }, [authToken]);

    const value = {
        isLoggedIn,
        authToken,
        user,
        login,
        logout
    }

    if (loading) {
        return null; // or a loading spinner
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
