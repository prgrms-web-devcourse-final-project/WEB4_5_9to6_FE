"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useOwnItemStore } from "@/stores/ownItemStore";

export default function AuthInitializer() {
    const { fetchItemsOwn } = useOwnItemStore();
    useEffect(() => {
        if (useAuthStore.getState().isFetched) return;

        const fetchUser = async () => {
            await useAuthStore.getState().refetch();
        };

        fetchUser();
    }, []);

    useEffect(() => {
        fetchItemsOwn();
    }, [fetchItemsOwn]);

    return null;
}
