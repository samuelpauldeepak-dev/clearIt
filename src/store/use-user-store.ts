import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserTier = "free" | "basic" | "pro" | "unlimited";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phoneNumber?: string;
  bio?: string;
  location?: string;
  jobTitle?: string;
  company?: string;
}

export interface UserSubscription {
  tier: UserTier;
  usageCount: number;
  usageLimit: number;
  expiresAt?: string;
  status: "active" | "expired" | "canceled";
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  notifications: {
    email: boolean;
    marketing: boolean;
    productUpdates: boolean;
  };
}

interface UserState {
  user: UserProfile | null;
  subscription: UserSubscription;
  preferences: UserPreferences;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: UserProfile | null) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  updateSubscription: (subscription: Partial<UserSubscription>) => void;
  incrementUsage: () => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      subscription: {
        tier: "free",
        usageCount: 0,
        usageLimit: 1,
        status: "active",
      },
      preferences: {
        theme: "light",
        language: "en",
        notifications: {
          email: true,
          marketing: false,
          productUpdates: true,
        },
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      updateProfile: (profile) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...profile } : null,
        })),

      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),

      updateSubscription: (subscription) =>
        set((state) => ({
          subscription: { ...state.subscription, ...subscription },
        })),

      incrementUsage: () =>
        set((state) => ({
          subscription: {
            ...state.subscription,
            usageCount: state.subscription.usageCount + 1,
          },
        })),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          subscription: {
            tier: "free",
            usageCount: 0,
            usageLimit: 1,
            status: "active",
          },
        }),
    }),
    {
      name: "utilso-user-storage",
    },
  ),
);
