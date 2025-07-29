import { create } from "zustand";
import { fetchMyInfo } from "@/api/members";

export const useAuthStore = create<AuthStore>((set) => ({
    isLogIn: false,
    isFetched: false,
    myInfo: null,
    refetch: async () => {
        try {
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
        } catch (error) {
            set({ isLogIn: false, myInfo: null });
            console.log(error);
        } finally {
            set({ isFetched: true });
        }
    },
    login: () => {
        useAuthStore.getState().refetch();
    },
    logout: () => {
        set({ isLogIn: false, myInfo: null });
    },
}));
