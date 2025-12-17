"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { storage } from "@/utils/storage";
import { User } from "@/interface/user.interface";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [justLoggedOut, setJustLoggedOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const publicRoutes = ["/login", "/signup"];

  // ⭐ Load auth data AFTER hydration
  useEffect(() => {
    const savedUser = storage.get("auth_user");
    const savedToken = storage.get("auth_token");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));

    setHydrated(true);
  }, []);

  // ⭐ Prevent redirect until hydration complete
  useEffect(() => {
    if (!hydrated || !pathname) return;

    const loggedIn = !!token;

    if (justLoggedOut) return;

    if (loggedIn && publicRoutes.includes(pathname)) {
      router.replace("/dashboard");
      return;
    }

    if (!loggedIn && !publicRoutes.includes(pathname)) {
      router.replace("/login");
      return;
    }
  }, [token, hydrated, pathname, justLoggedOut]);

  const login = (token: string, userData: User) => {
    setToken(token);
    setUser(userData);

    storage.set("auth_token", token);
    storage.set("auth_user", JSON.stringify(userData));

    router.replace("/dashboard");
  };

  const logout = () => {
    setJustLoggedOut(true);

    setToken(null);
    setUser(null);

    storage.remove("auth_token");
    storage.remove("auth_user");

    router.replace("/login");
    setTimeout(() => setJustLoggedOut(false), 300);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {/* Prevent UI before hydration */}
      {hydrated ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
