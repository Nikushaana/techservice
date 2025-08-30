import { create } from "zustand";

interface RegisterState {
    userType: "individual" | "company";
    values: {
        phone?: string;
        code?: string;
        name?: string;
        lastName?: string;
        companyAgentName?: string;
        companyAgentLastName?: string;
        companyName?: string;
        companyIdentificationCode?: string;
        password?: string;
        repeatPassword?: string;
    };
    setUserType: (type: "individual" | "company") => void;
    setValues: (key: string, value: string) => void;
    resetValues: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
    userType: "individual",
    values: {},
    setUserType: (type) => set({ userType: type }),
    setValues: (key, value) =>
        set((state) => ({ values: { ...state.values, [key]: value } })),
    resetValues: () => set({ values: {}, userType: "individual" }),
}));