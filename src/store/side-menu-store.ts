import { create } from "zustand";

interface SideMenuState {
  isOpen: boolean;
  toggleSideMenu: () => void;
}

const useSideMenuStore = create<SideMenuState>((set) => ({
  isOpen: false,
  toggleSideMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSideMenuStore;
