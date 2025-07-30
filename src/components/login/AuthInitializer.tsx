"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useOwnItemStore } from "@/stores/ownItemStore";
import { useAlarmStore } from "@/stores/alarmStore";
import { useThemeStore } from "@/stores/themeStore";

export default function AuthInitializer() {
    const isLogIn = useAuthStore((state) => state.isLogIn);

    useEffect(() => {
        const auth = useAuthStore.getState();
        const ownItem = useOwnItemStore.getState();
        const alarm = useAlarmStore.getState();
        let eventSource: EventSource;

        useThemeStore.getState().initTheme();
        if (!auth.isFetched) {
            auth.refetch();
            console.log("리패치");
        } else if (isLogIn) {
            ownItem.fetchItemsOwn();
            alarm.fetchAlarms();
            console.log("유저 데이터 불러오기");

            eventSource = new EventSource(
                "https://studium.cedartodo.uk/api/v1/alarms/subscribe",
                {
                    withCredentials: true,
                },
            );

            eventSource.onopen = () => {
                console.log("SSE 연결 성공");
            };

            eventSource.addEventListener("alarm", (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log("알림 추가 : ", data);
                    alarm.addAlarm(data);
                } catch (error) {
                    console.error(error);
                }
            });
            eventSource.onerror = (error) => {
                console.error(error);
                eventSource.close();
            };
        }

        return () => {
            if (eventSource) eventSource.close();
        };
    }, [isLogIn]);

    return null;
}
