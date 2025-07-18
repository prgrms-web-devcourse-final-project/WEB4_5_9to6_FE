import { create } from "zustand";
import { fetchMyInfo } from "@/api/members";

export const useAuthStore = create<AuthStore>((set) => ({
    isLogIn: false,
    myInfo: null,
    refetch: async () => {
        const response = await fetchMyInfo();
        if (response.code === "0000") {
            set({
                myInfo: {
                    ...response.data.memberInfo,
                    avatarInfo: response.data.avatarInfo,
                },
                isLogIn: true,
            });
            console.log(useAuthStore.getState().myInfo);
        }
    },
    login: (token: string) => {
        localStorage.setItem("accessToken", token);
        useAuthStore.getState().refetch();
    },
    logout: () => {
        set({ isLogIn: false, myInfo: null });
        localStorage.removeItem("accessToken");
    },
}));
