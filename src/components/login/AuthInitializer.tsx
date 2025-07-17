"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function AuthInitializer() {
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const fetchUser = async () => {
            await useAuthStore.getState().refetch();
        };

        fetchUser();
    }, []);

    console.log(useAuthStore.getState().isLogIn);
    console.log(useAuthStore.getState().myInfo);

    return null;
}
