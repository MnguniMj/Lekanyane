export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "Lekanyane@2026",
} as const;

const SESSION_KEY = "lekanyane_admin_session_v1";

export interface AdminSession {
  username: string;
  loggedInAt: string;
}

export const isBrowser = (): boolean => typeof window !== "undefined";

export const getSession = (): AdminSession | null => {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
};

export const setSession = (session: AdminSession): void => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // noop
  }
};

export const clearSession = (): void => {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // noop
  }
};

export const login = (
  username: string,
  password: string
): { ok: true; session: AdminSession } | { ok: false; error: string } => {
  if (!username.trim()) {
    return { ok: false, error: "Please enter your username." };
  }
  if (!password) {
    return { ok: false, error: "Please enter your password." };
  }
  if (
    username.trim() !== ADMIN_CREDENTIALS.username ||
    password !== ADMIN_CREDENTIALS.password
  ) {
    return { ok: false, error: "Invalid username or password." };
  }
  const session: AdminSession = {
    username: username.trim(),
    loggedInAt: new Date().toISOString(),
  };
  setSession(session);
  return { ok: true, session };
};

export const logout = (): void => clearSession();
