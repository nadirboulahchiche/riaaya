import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext({
    isLoggedIn: false,
    authToken: null,
    user: null,
    login: () => { },
    logout: () => { }
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() =>
        localStorage.getItem("isLoggedIn") === "true"
    );

    const [authToken, setAuthToken] = useState(() => {
        const token = localStorage.getItem("authToken");
        try {
            return token ? JSON.parse(token) : null;
        } catch {
            return null;
        }
    });

    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem("user");
        try {
            return userData ? JSON.parse(userData) : null;
        } catch {
            return null;
        }
    });

    const [loading, setLoading] = useState(true);

    const login = (authToken) => {
        setLoading(true);
        setIsLoggedIn(true);
        setAuthToken(authToken?.accessToken);
        setUser(authToken?.user);  // ✅ Fixed this line
        localStorage.setItem("isLoggedIn", "true");  // ✅ Should be string "true"
        localStorage.setItem("authToken", JSON.stringify(authToken?.accessToken));
        localStorage.setItem("user", JSON.stringify(authToken?.user));
        setLoading(false);
    }

    const logout = () => {
        setIsLoggedIn(false);
        setAuthToken(null);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
    }

    useEffect(() => {

        if (loading) {
            setLoading(false);
        }

        let interval = setInterval(() => {
            if (authToken) {
                logout();
            }
        }, 82800000)

        return () => clearInterval(interval);
    }, [authToken, loading])


    const value = {
        isLoggedIn: isLoggedIn,
        authToken: authToken,
        user: user,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={value}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

} 
