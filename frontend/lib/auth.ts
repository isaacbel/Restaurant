// frontend/lib/auth.ts
import api from "./api";

export interface AdminUser {
  id:       string;
  username: string;
  email:    string;
}

export const authService = {
  // Login — saves token + user to localStorage
  login: async (email: string, password: string): Promise<AdminUser> => {
    const res = await api.post("/api/auth/login", { email, password });
    const { token, admin } = res.data;
    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_user", JSON.stringify(admin));
    return admin;
  },

  // Logout
  logout: async () => {
    await api.post("/api/auth/logout").catch(() => {});
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    window.location.href = "/admin/login";
  },

  // Get stored user (no API call)
  getUser: (): AdminUser | null => {
    if (typeof window === "undefined") return null;
    const u = localStorage.getItem("admin_user");
    return u ? JSON.parse(u) : null;
  },

  // Check if logged in
  isLoggedIn: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("admin_token");
  },

  // Verify token with server
  verify: async (): Promise<AdminUser | null> => {
    try {
      const res = await api.get("/api/auth/me");
      return res.data.admin;
    } catch {
      return null;
    }
  },
};