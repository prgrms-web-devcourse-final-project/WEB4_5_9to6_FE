"use client";

import { readAllAlarm } from "@/api/alarms";
import AlertMessage from "@/components/AlertMessage";
import SubHeader from "@/components/common/SubHeader";
import { useAlarmStore } from "@/stores/alarmStore";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Notifications() {
    const { alarmList, isLoading, fetchAlarms } = useAlarmStore();

    const { mutate: readAllNotification } = useMutation({
        mutationFn: readAllAlarm,
        onSuccess: () => {
            useAlarmStore.getState().clear();
        },
        onError: (error) => {
            console.error(error);
        },
    });
    useEffect(() => {
        fetchAlarms();
    }, [fetchAlarms]);

    if (isLoading) {
        return (
            <>
                <SubHeader>알림</SubHeader>
                <div className="pt-15">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="m-5 flex w-[90%] animate-pulse items-center justify-center"
                        >
                            <div className="bg-gray200 dark:bg-gray700 relative mr-4 h-12 w-12 shrink-0 rounded-2xl" />
                            <div className="flex h-12 w-full flex-col justify-center gap-1">
                                <div className="bg-gray300 dark:bg-gray800 h-4 w-3/5 rounded" />
                                <div className="bg-gray300 dark:bg-gray800 h-4 w-4/5 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
            <SubHeader>알림</SubHeader>
            <button
                className="c2 fixed right-5 z-50 cursor-pointer pt-5 text-[var(--color-gray600)]"
                onClick={() => readAllNotification()}
            >
                모두읽기
            </button>
            <div className="pt-15">
                {alarmList.filter((alarm) => alarm.isRead === false).length ===
                    0 && (
                    <p className="b2 flex items-center justify-center pt-10 text-[var(--color-gray600)]">
                        받은 알림이 없습니다.
                    </p>
                )}
                {alarmList
                    .filter((alarm) => alarm.isRead === false)
                    .map((alarm, i) => (
                        <AlertMessage key={i} alarm={alarm} />
                    ))}
            </div>
        </>
    );
}
