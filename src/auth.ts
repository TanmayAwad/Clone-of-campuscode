const AUTH_SESSION_KEY = 'campuscode-authenticated';
const ACTIVE_USER_EMAIL_KEY = 'campuscode-active-user-email';
const PROFILES_KEY = 'campuscode-profiles';

type CampusCodeProfile = {
  email: string;
  name: string;
};

function getSavedProfiles(): CampusCodeProfile[] {
  const savedProfiles = window.localStorage.getItem(PROFILES_KEY);
  if (!savedProfiles) return [];

  try {
    const profiles: unknown = JSON.parse(savedProfiles);
    if (!Array.isArray(profiles)) return [];

    return profiles.filter((profile): profile is CampusCodeProfile => {
      if (typeof profile !== 'object' || profile === null) return false;
      const record = profile as Record<string, unknown>;
      return typeof record.email === 'string' && typeof record.name === 'string';
    });
  } catch {
    return [];
  }
}

export function saveRegisteredProfile(name: string, email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const profiles = getSavedProfiles().filter((profile) => profile.email !== normalizedEmail);
  profiles.push({ email: normalizedEmail, name: name.trim() });
  window.localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

export function startAuthSession(email: string) {
  window.sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
  window.sessionStorage.setItem(ACTIVE_USER_EMAIL_KEY, email.trim().toLowerCase());
}

export function endAuthSession() {
  window.sessionStorage.removeItem(AUTH_SESSION_KEY);
  window.sessionStorage.removeItem(ACTIVE_USER_EMAIL_KEY);
}

export function hasAuthSession() {
  return window.sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
}

export function getCurrentUserName() {
  const activeEmail = window.sessionStorage.getItem(ACTIVE_USER_EMAIL_KEY);
  if (!activeEmail) return 'Student';

  return getSavedProfiles().find((profile) => profile.email === activeEmail)?.name || 'Student';
}
