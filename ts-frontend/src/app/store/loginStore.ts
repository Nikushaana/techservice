import { create } from "zustand";

interface LoginState {
    values: {
        phone?: string;
        password?: string;
    };
    setValues: (key: string, value: string) => void;
    resetValues: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
    values: {},
    setValues: (key, value) =>
        set((state) => ({ values: { ...state.values, [key]: value } })),
    resetValues: () => set({ values: {} }),
}));