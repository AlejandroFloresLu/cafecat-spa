const KEY = "cafecat-user";
export const Auth = {
  load() { try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch { return null; } },
  save(user) { localStorage.setItem(KEY, JSON.stringify(user)); },
  logout() { localStorage.removeItem(KEY); },
  current() { return this.load(); },
  isLogged() { return !!this.load(); }
};