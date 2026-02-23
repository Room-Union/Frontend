import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  authStatus: boolean;
  setSignedIn: () => void;
  setSignedOut: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authStatus: false,
      setSignedIn: () => set({ authStatus: true }),
      setSignedOut: () => set({ authStatus: false }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        authStatus: state.authStatus,
      }),
    }
  )
);
