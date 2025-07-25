"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function AuthInitializer() {
    useEffect(() => {
        if (useAuthStore.getState().isFetched) return;

        const fetchUser = async () => {
            await useAuthStore.getState().refetch();
        };

        fetchUser();
    }, []);

    return null;
}
