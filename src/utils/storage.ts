import type { DailyTracking, Group, UserProfile } from '../types';

const STORAGE_KEYS = {
  TRACKING: 'jannah_tracking',
  GROUPS: 'jannah_groups',
  USER: 'jannah_user',
  CURRENT_GROUP: 'jannah_current_group',
};

export const storage = {
  // User Profile
  getUser: (): UserProfile | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  setUser: (user: UserProfile): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  // Daily Tracking
  getTracking: (): DailyTracking[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TRACKING);
    return data ? JSON.parse(data) : [];
  },

  saveTracking: (tracking: DailyTracking[]): void => {
    localStorage.setItem(STORAGE_KEYS.TRACKING, JSON.stringify(tracking));
  },

  getTrackingByDate: (date: string): DailyTracking | undefined => {
    const tracking = storage.getTracking();
    return tracking.find(t => t.date === date);
  },

  saveDayTracking: (dayTracking: DailyTracking): void => {
    const tracking = storage.getTracking();
    const existingIndex = tracking.findIndex(t => t.date === dayTracking.date);

    if (existingIndex >= 0) {
      tracking[existingIndex] = dayTracking;
    } else {
      tracking.push(dayTracking);
    }

    storage.saveTracking(tracking);
  },

  // Groups
  getGroups: (): Group[] => {
    const data = localStorage.getItem(STORAGE_KEYS.GROUPS);
    return data ? JSON.parse(data) : [];
  },

  saveGroups: (groups: Group[]): void => {
    localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
  },

  getCurrentGroupId: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_GROUP);
  },

  setCurrentGroupId: (groupId: string | null): void => {
    if (groupId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_GROUP, groupId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_GROUP);
    }
  },

  // Clear all data
  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },
};
