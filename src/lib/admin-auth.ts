const AUTH_KEY = "secstack_admin_session";

export const adminAuth = {
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(AUTH_KEY) === "true";
  },

  login(email: string, password: string): boolean {
    // Demo credentials — replace with real API call
    if (email === "admin@secstackhq.com" && password === "admin123") {
      localStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  },

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  },
};