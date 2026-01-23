import { create } from "zustand";

export interface PopupConfig {
  id: string;
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error" | "welcome";
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface GlobalUIState {
  featureFlags: Record<string, boolean>;
  activePopups: PopupConfig[];

  // Actions
  setFeatureFlag: (flag: string, value: boolean) => void;
  showPopup: (popup: PopupConfig) => void;
  closePopup: (id: string) => void;
  toggleFeatureFlag: (flag: string) => void;
  bannerVisible: boolean;
  setBannerVisible: (visible: boolean) => void;
  searchOverlayOpen: boolean;
  setSearchOverlayOpen: (open: boolean) => void;
}

export const useGlobalUIStore = create<GlobalUIState>((set) => ({
  featureFlags: {
    advancedTools: true,
    betaFeatures: false,
    newDashboard: false,
  },
  activePopups: [],

  setFeatureFlag: (flag, value) =>
    set((state) => ({
      featureFlags: { ...state.featureFlags, [flag]: value },
    })),

  toggleFeatureFlag: (flag) =>
    set((state) => ({
      featureFlags: {
        ...state.featureFlags,
        [flag]: !state.featureFlags[flag],
      },
    })),

  showPopup: (popup) =>
    set((state) => {
      // Prevent duplicates by ID
      if (state.activePopups.some((p) => p.id === popup.id)) {
        return state;
      }
      return {
        activePopups: [...state.activePopups, popup],
      };
    }),

  closePopup: (id) =>
    set((state) => ({
      activePopups: state.activePopups.filter((p) => p.id !== id),
    })),

  bannerVisible: true,
  setBannerVisible: (visible) => set({ bannerVisible: visible }),
  searchOverlayOpen: false,
  setSearchOverlayOpen: (open) => set({ searchOverlayOpen: open }),
}));

// Hook for easier consumption
export const useGlobalUI = () => {
  const store = useGlobalUIStore();
  return store;
};
