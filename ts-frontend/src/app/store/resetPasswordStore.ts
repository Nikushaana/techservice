import { create } from "zustand";

interface ResetPasswordState {
    values: {
        phone?: string;
        code?: string;
        newPassword?: string;
        repeatNewPassword?: string;
    };
    setValues: (key: string, value: string) => void;
    resetValues: () => void;
}

export const useResetPasswordStore = create<ResetPasswordState>((set) => ({
    values: {},
    setValues: (key, value) =>
        set((state) => ({ values: { ...state.values, [key]: value } })),
    resetValues: () => set({ values: {} }),
}));