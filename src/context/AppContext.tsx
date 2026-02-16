import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type {
  DailyTracking,
  Habit,
  Group,
  UserProfile,
  PrayerDetails,
} from '../types';
import { PRAYERS } from '../types';
import { storage } from '../utils/storage';
import { formatDate } from '../utils/date';
import { calculateDayScore } from '../utils/stats';

interface AppState {
  user: UserProfile | null;
  tracking: DailyTracking[];
  groups: Group[];
  currentGroupId: string | null;
  selectedDate: string;
  isLoading: boolean;
}

type Action =
  | { type: 'SET_USER'; payload: UserProfile }
  | { type: 'SET_TRACKING'; payload: DailyTracking[] }
  | { type: 'UPDATE_DAY_TRACKING'; payload: DailyTracking }
  | { type: 'SET_GROUPS'; payload: Group[] }
  | { type: 'ADD_GROUP'; payload: Group }
  | { type: 'UPDATE_GROUP'; payload: Group }
  | { type: 'REMOVE_GROUP'; payload: string }
  | { type: 'SET_CURRENT_GROUP'; payload: string | null }
  | { type: 'SET_SELECTED_DATE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  user: null,
  tracking: [],
  groups: [],
  currentGroupId: null,
  selectedDate: formatDate(new Date()),
  isLoading: true,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TRACKING':
      return { ...state, tracking: action.payload };
    case 'UPDATE_DAY_TRACKING': {
      const existingIndex = state.tracking.findIndex(
        t => t.date === action.payload.date
      );
      const newTracking = [...state.tracking];
      if (existingIndex >= 0) {
        newTracking[existingIndex] = action.payload;
      } else {
        newTracking.push(action.payload);
      }
      storage.saveTracking(newTracking);
      return { ...state, tracking: newTracking };
    }
    case 'SET_GROUPS':
      return { ...state, groups: action.payload };
    case 'ADD_GROUP':
      return { ...state, groups: [...state.groups, action.payload] };
    case 'UPDATE_GROUP': {
      const newGroups = state.groups.map(g =>
        g.id === action.payload.id ? action.payload : g
      );
      storage.saveGroups(newGroups);
      return { ...state, groups: newGroups };
    }
    case 'REMOVE_GROUP': {
      const newGroups = state.groups.filter(g => g.id !== action.payload);
      storage.saveGroups(newGroups);
      return {
        ...state,
        groups: newGroups,
        currentGroupId: state.currentGroupId === action.payload ? null : state.currentGroupId,
      };
    }
    case 'SET_CURRENT_GROUP':
      storage.setCurrentGroupId(action.payload);
      return { ...state, currentGroupId: action.payload };
    case 'SET_SELECTED_DATE':
      return { ...state, selectedDate: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

interface AppContextType extends AppState {
  initializeUser: (name: string) => void;
  toggleHabit: (habitId: string) => void;
  updateQuranPages: (pages: number) => void;
  updateDuaCount: (count: number) => void;
  updatePrayerDetails: (habitId: string, details: PrayerDetails) => void;
  createGroup: (name: string, description?: string) => void;
  joinGroup: (inviteCode: string) => boolean;
  leaveGroup: (groupId: string) => void;
  setCurrentGroup: (groupId: string | null) => void;
  setSelectedDate: (date: string) => void;
  getTodayTracking: () => DailyTracking;
  getCurrentGroup: () => Group | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from storage on mount
  useEffect(() => {
    const user = storage.getUser();
    const tracking = storage.getTracking();
    const groups = storage.getGroups();
    const currentGroupId = storage.getCurrentGroupId();

    if (user) {
      dispatch({ type: 'SET_USER', payload: user });
    }
    dispatch({ type: 'SET_TRACKING', payload: tracking });
    dispatch({ type: 'SET_GROUPS', payload: groups });
    dispatch({ type: 'SET_CURRENT_GROUP', payload: currentGroupId });
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const createDefaultHabits = (): Habit[] => {
    const prayerHabits: Habit[] = PRAYERS.map(prayer => ({
      id: uuidv4(),
      name: prayer.label,
      type: 'prayer' as const,
      completed: false,
      prayerName: prayer.name,
    }));

    return [
      ...prayerHabits,
      {
        id: uuidv4(),
        name: 'Quran Reading',
        type: 'quran' as const,
        completed: false,
        quranPages: 0,
      },
      {
        id: uuidv4(),
        name: 'Dua',
        type: 'dua' as const,
        completed: false,
        duaCount: 0,
      },
    ];
  };

  const getTodayTracking = (): DailyTracking => {
    const today = state.selectedDate;
    const existing = state.tracking.find(t => t.date === today);

    if (existing) {
      return existing;
    }

    return {
      date: today,
      habits: createDefaultHabits(),
      score: 0,
    };
  };

  const initializeUser = (name: string) => {
    const user: UserProfile = {
      id: uuidv4(),
      name,
      createdAt: new Date().toISOString(),
    };
    storage.setUser(user);
    dispatch({ type: 'SET_USER', payload: user });
  };

  const toggleHabit = (habitId: string) => {
    const todayTracking = getTodayTracking();
    const updatedHabits = todayTracking.habits.map(habit =>
      habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
    );
    const score = calculateDayScore(updatedHabits);

    const updated: DailyTracking = {
      ...todayTracking,
      habits: updatedHabits,
      score,
    };

    dispatch({ type: 'UPDATE_DAY_TRACKING', payload: updated });
  };

  const updateQuranPages = (pages: number) => {
    const todayTracking = getTodayTracking();
    const updatedHabits = todayTracking.habits.map(habit =>
      habit.type === 'quran'
        ? { ...habit, quranPages: pages, completed: pages > 0 }
        : habit
    );
    const score = calculateDayScore(updatedHabits);

    const updated: DailyTracking = {
      ...todayTracking,
      habits: updatedHabits,
      score,
    };

    dispatch({ type: 'UPDATE_DAY_TRACKING', payload: updated });
  };

  const updateDuaCount = (count: number) => {
    const todayTracking = getTodayTracking();
    const updatedHabits = todayTracking.habits.map(habit =>
      habit.type === 'dua'
        ? { ...habit, duaCount: count, completed: count > 0 }
        : habit
    );
    const score = calculateDayScore(updatedHabits);

    const updated: DailyTracking = {
      ...todayTracking,
      habits: updatedHabits,
      score,
    };

    dispatch({ type: 'UPDATE_DAY_TRACKING', payload: updated });
  };

  const updatePrayerDetails = (habitId: string, details: PrayerDetails) => {
    const todayTracking = getTodayTracking();
    const updatedHabits = todayTracking.habits.map(habit =>
      habit.id === habitId
        ? { ...habit, prayerDetails: details }
        : habit
    );

    const updated: DailyTracking = {
      ...todayTracking,
      habits: updatedHabits,
      score: todayTracking.score,
    };

    dispatch({ type: 'UPDATE_DAY_TRACKING', payload: updated });
  };

  const generateInviteCode = (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createGroup = (name: string, description?: string) => {
    if (!state.user) return;

    const group: Group = {
      id: uuidv4(),
      name,
      description,
      inviteCode: generateInviteCode(),
      members: [
        {
          id: state.user.id,
          name: state.user.name,
          avatar: state.user.avatar,
          joinedAt: new Date().toISOString(),
        },
      ],
      createdBy: state.user.id,
      createdAt: new Date().toISOString(),
    };

    const newGroups = [...state.groups, group];
    storage.saveGroups(newGroups);
    dispatch({ type: 'ADD_GROUP', payload: group });
    dispatch({ type: 'SET_CURRENT_GROUP', payload: group.id });
    storage.setCurrentGroupId(group.id);
  };

  const joinGroup = (inviteCode: string): boolean => {
    if (!state.user) return false;

    const group = state.groups.find(g => g.inviteCode === inviteCode);
    if (!group) return false;

    if (group.members.some(m => m.id === state.user!.id)) {
      dispatch({ type: 'SET_CURRENT_GROUP', payload: group.id });
      return true;
    }

    const updatedGroup: Group = {
      ...group,
      members: [
        ...group.members,
        {
          id: state.user.id,
          name: state.user.name,
          avatar: state.user.avatar,
          joinedAt: new Date().toISOString(),
        },
      ],
    };

    dispatch({ type: 'UPDATE_GROUP', payload: updatedGroup });
    dispatch({ type: 'SET_CURRENT_GROUP', payload: group.id });
    return true;
  };

  const leaveGroup = (groupId: string) => {
    if (!state.user) return;

    const group = state.groups.find(g => g.id === groupId);
    if (!group) return;

    if (group.createdBy === state.user.id) {
      dispatch({ type: 'REMOVE_GROUP', payload: groupId });
    } else {
      const userId = state.user.id;
      const updatedGroup: Group = {
        ...group,
        members: group.members.filter(m => m.id !== userId),
      };
      dispatch({ type: 'UPDATE_GROUP', payload: updatedGroup });
    }

    if (state.currentGroupId === groupId) {
      dispatch({ type: 'SET_CURRENT_GROUP', payload: null });
    }
  };

  const setCurrentGroup = (groupId: string | null) => {
    dispatch({ type: 'SET_CURRENT_GROUP', payload: groupId });
  };

  const setSelectedDate = (date: string) => {
    dispatch({ type: 'SET_SELECTED_DATE', payload: date });
  };

  const getCurrentGroup = (): Group | undefined => {
    return state.groups.find(g => g.id === state.currentGroupId);
  };

  const value: AppContextType = {
    ...state,
    initializeUser,
    toggleHabit,
    updateQuranPages,
    updateDuaCount,
    updatePrayerDetails,
    createGroup,
    joinGroup,
    leaveGroup,
    setCurrentGroup,
    setSelectedDate,
    getTodayTracking,
    getCurrentGroup,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
