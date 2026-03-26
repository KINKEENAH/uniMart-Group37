import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const stored = JSON.parse(localStorage.getItem("unimart_auth") || "null");

export function AuthProvider({ children }) {
  const [user, setUser] = useState(stored?.user || null);
  const [token, setToken] = useState(stored?.token || null);

  const login = async (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("unimart_auth", JSON.stringify({ user: userData, token: jwt }));
    // fetch full profile in background
    try {
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem("unimart_auth", JSON.stringify({ user: data.user, token: jwt }));
      }
    } catch {
      // non-critical, basic user data already set
    }
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem("unimart_auth", JSON.stringify({ user: data.user, token }));
      }
    } catch {}
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("unimart_auth");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn: !!user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
