export type UserRole = "admin" | "customer";

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  name: string;
  role: UserRole;
};

export type AuthSession = AuthUser & {
  loggedInAt: string;
};

const SESSION_KEY = "sellplan_session";

/** Demo directory — identify role by username OR email (case-insensitive). */
export const DEMO_USERS: (AuthUser & { password: string })[] = [
  {
    id: "u-admin",
    username: "admin",
    email: "admin@sellplan.com",
    name: "SellPlan Admin",
    role: "admin",
    password: "admin123",
  },
  {
    id: "u-staff",
    username: "staff",
    email: "staff@sellplan.com",
    name: "Portal Staff",
    role: "admin",
    password: "staff123",
  },
  {
    id: "u-anas",
    username: "anas",
    email: "anasbinazim90@gmail.com",
    name: "Anas Bin Azim",
    role: "customer",
    password: "customer123",
  },
  {
    id: "u-demo",
    username: "customer",
    email: "customer@business.com",
    name: "Demo Customer",
    role: "customer",
    password: "customer123",
  },
];

function norm(value: string) {
  return value.trim().toLowerCase();
}

/** Match account by username or email. */
export function findUserByIdentifier(identifier: string) {
  const key = norm(identifier);
  return DEMO_USERS.find(
    (u) => norm(u.email) === key || norm(u.username) === key,
  );
}

export function homeForRole(role: UserRole) {
  return role === "admin" ? "/admin" : "/portal";
}

export function authenticate(
  identifier: string,
  password: string,
): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const found = findUserByIdentifier(identifier);
  if (!found) {
    return {
      ok: false,
      error: "No account found for that username or email.",
    };
  }
  if (found.password !== password) {
    return { ok: false, error: "Incorrect password." };
  }
  const { password: _pw, ...user } = found;
  return { ok: true, user };
}

/** New signups are always customers (staff accounts are provisioned). */
export function registerCustomer(input: {
  username: string;
  email: string;
  name: string;
  password: string;
}): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const username = norm(input.username);
  const email = norm(input.email);

  if (!username || !email) {
    return { ok: false, error: "Username and email are required." };
  }

  if (findUserByIdentifier(username) || findUserByIdentifier(email)) {
    return { ok: false, error: "Username or email already in use." };
  }

  // Staff emails cannot self-register as customers via public signup
  if (email.endsWith("@sellplan.com")) {
    return {
      ok: false,
      error: "SellPlan staff accounts are created by the team — use Log in.",
    };
  }

  const user: AuthUser & { password: string } = {
    id: `u-${Date.now()}`,
    username,
    email,
    name: input.name.trim() || username,
    role: "customer",
    password: input.password,
  };
  DEMO_USERS.push(user);
  const { password: _pw, ...safe } = user;
  return { ok: true, user: safe };
}

export function saveSession(user: AuthUser) {
  if (typeof window === "undefined") return;
  const session: AuthSession = {
    ...user,
    loggedInAt: new Date().toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
