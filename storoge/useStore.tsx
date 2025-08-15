import { create } from "zustand";

type TokenStore = {
    token: string | null;
    saveToken: (token: string) => void;
}

export const useStoreToken = create<TokenStore>() ((set) => ({
    token: null,
    saveToken: (token) => set(() => ({ token })),
}))

