/**
 * AuthContext
 * -----------------------------------------------------------------------
 * App-wide auth state: current user, loading status, and the
 * login/register/logout actions. Any component (Sidebar, UserMenu,
 * ProtectedRoute, Login page) reads this via the useAuth() hook instead
 * of prop-drilling user/token through every layer of the component tree.
 *
 * TOKEN PERSISTENCE: the token is saved to localStorage so refreshing
 * the page (or closing/reopening the browser) doesn't log the user out.
 * On mount, if a token exists, we validate it against the backend
 * (fetchCurrentUser) rather than trusting it blindly — an expired or
 * tampered token gets rejected and the user is treated as logged out.
 * ----------------------------------------------------------------------- */

import { createContext, useEffect, useState } from "react";
import { registerUser, loginUser, fetchCurrentUser } from "../services/authService";

const TOKEN_STORAGE_KEY = "astra_token";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // true until initial session check finishes

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!storedToken) {
      setLoading(false);
      return;
    }

    fetchCurrentUser(storedToken)
      .then((data) => {
        setUser(data.user);
        setToken(storedToken);
      })
      .catch(() => {
        // Token is invalid/expired — clear it silently rather than
        // showing an error for something the user didn't actively do.
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const data = await loginUser({ email, password });
    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    setUser(data.user);
    setToken(data.token);
    return data;
  }

  async function register(name, email, password) {
    const data = await registerUser({ name, email, password });
    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    setUser(data.user);
    setToken(data.token);
    return data;
  }

  function logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
    setToken(null);
  }

  const value = { user, token, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}