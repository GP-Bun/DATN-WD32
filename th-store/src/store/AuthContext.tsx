import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import axios from "axios";

// ---------------- Types ----------------
type User = { id: number; name: string; email: string };
type Admin = { id: number; name: string; email: string };

type AuthContextValue = {
  user: User | null;
  admin: Admin | null;
  userToken: string | null;
  adminToken: string | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (name: string, email: string, password: string) => Promise<void>;
  loginAdmin: (email: string, password: string) => Promise<void>;
  registerAdmin: (name: string, email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  logoutAdmin: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [userToken, setUserToken] = useState<string | null>(localStorage.getItem("user_token"));
  const [adminToken, setAdminToken] = useState<string | null>(localStorage.getItem("admin_token"));

  // ---------------- USER ----------------
  const registerUser = async (name: string, email: string, password: string) => {
    await axios.post("http://127.0.0.1:8000/api/register", { name, email, password });
  };

  const loginUser = async (email: string, password: string) => {
    const res = await axios.post<{ user: User; token: string }>(
      "http://127.0.0.1:8000/api/login",
      { email, password }
    );
    setUser(res.data.user);
    setUserToken(res.data.token);
    localStorage.setItem("user_token", res.data.token);
  };

  const logoutUser = async () => {
    try {
      if (userToken) {
        await axios.post(
          "http://127.0.0.1:8000/api/logout",
          {},
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
      }
    } catch (error) {
      console.warn("User logout error:", error);
    } finally {
      
      localStorage.removeItem("user_token");
      setUser(null);
      setUserToken(null);
    }
  };

  // ---------------- ADMIN ----------------
  const registerAdmin = async (name: string, email: string, password: string) => {
    await axios.post("http://127.0.0.1:8000/api/admin/register", { name, email, password });
  };

  const loginAdmin = async (email: string, password: string) => {
    const res = await axios.post<{ admin: Admin; access_token: string }>(
      "http://127.0.0.1:8000/api/admin/login",
      { email, password }
    );
    setAdmin(res.data.admin);
    setAdminToken(res.data.access_token);
    localStorage.setItem("admin_token", res.data.access_token);
  };

  const logoutAdmin = async () => {
    try {
      if (adminToken) {
        await axios.post(
          "http://127.0.0.1:8000/api/admin/logout",
          {},
          { headers: { Authorization: `Bearer ${adminToken}` } }
        );
      }
    } catch (error) {
      console.warn("Admin logout error:", error);
    } finally {
     
      localStorage.removeItem("admin_token");
      setAdmin(null);
      setAdminToken(null);
    }
  };

  // ---------------- AUTO LOAD USER/ADMIN ----------------
  useEffect(() => {
    // Nếu có token user → lấy thông tin user
    if (userToken && !user) {
      axios
        .get<{ user: User }>("http://127.0.0.1:8000/api/user-profile", {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem("user_token");
          setUserToken(null);
        });
    }

    // Nếu có token admin → lấy thông tin admin
    if (adminToken && !admin) {
      axios
        .get<{ admin: Admin }>("http://127.0.0.1:8000/api/admin/profile", {
          headers: { Authorization: `Bearer ${adminToken}` },
        })
        .then((res) => setAdmin(res.data.admin))
        .catch(() => {
          localStorage.removeItem("admin_token");
          setAdminToken(null);
        });
    }
  }, [userToken, adminToken]);

  // ---------------- Context Value ----------------
  const value = useMemo(
    () => ({
      user,
      admin,
      userToken,
      adminToken,
      loginUser,
      registerUser,
      loginAdmin,
      registerAdmin,
      logoutUser,
      logoutAdmin,
    }),
    [user, admin, userToken, adminToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
