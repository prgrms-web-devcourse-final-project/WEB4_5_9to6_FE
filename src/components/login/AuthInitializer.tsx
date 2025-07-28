"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useOwnItemStore } from "@/stores/ownItemStore";
import { useAlarmStore } from "@/stores/alarmStore";

export default function AuthInitializer() {
    const eventSourceRef = useRef<EventSource | null>(null);
    const isLogIn = useAuthStore((state) => state.isLogIn);

    useEffect(() => {
        const auth = useAuthStore.getState();
        const ownItem = useOwnItemStore.getState();
        const alarm = useAlarmStore.getState();

        if (!auth.isFetched) {
            auth.refetch();
            console.log("리패치");
        } else if (isLogIn) {
            ownItem.fetchItemsOwn();
            alarm.fetchAlarms();
            console.log("유저 데이터 불러오기");

            // 알림 SSE 연결
            if (!eventSourceRef.current) {
                const es = new EventSource(
                    "https://studium.cedartodo.uk/api/v1/alarms/subscribe",
                    {
                        withCredentials: true,
                    },
                );
                eventSourceRef.current = es;

                es.onmessage = (response) => {
                    try {
                        const { code, data } = JSON.parse(response.data);
                        if (code === "0000") alarm.addAlarm(data);
                    } catch (error) {
                        console.error(error);
                    }
                };
                es.onerror = (error) => {
                    console.error(error);
                    es.close();
                    eventSourceRef.current = null;
                };
            }
        }

        return () => {
            eventSourceRef.current?.close();
            eventSourceRef.current = null;
        };
    }, [isLogIn]);

    return null;
}
