import { create } from "zustand";

interface BurgerMenuState {
    isOpen: boolean;
    toggleBurgerMenu: () => void;
    closeBurgerMenu: () => void;
}

export const useBurgerMenuStore = create<BurgerMenuState>((set) => ({
    isOpen: false,
    toggleBurgerMenu: () => set((state) => ({ isOpen: !state.isOpen })),
    closeBurgerMenu: () => set({ isOpen: false }),
}));