"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useOwnItemStore } from "@/stores/ownItemStore";
import { useThemeStore } from "@/stores/themeStore";

export default function AuthInitializer() {
    const isLogIn = useAuthStore((state) => state.isLogIn);

    useEffect(() => {
        const auth = useAuthStore.getState();
        const ownItem = useOwnItemStore.getState();

        useThemeStore.getState().initTheme();
        if (!auth.isFetched) {
            auth.refetch();
            console.log("리패치");
        } else if (isLogIn) {
            ownItem.fetchItemsOwn();
            console.log("유저 데이터 불러오기");
        }
    }, [isLogIn]);

    return null;
}
