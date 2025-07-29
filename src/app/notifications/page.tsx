"use client";

import { readAllAlarm } from "@/api/alarms";
import AlertMessage from "@/components/AlertMessage";
import SubHeader from "@/components/common/SubHeader";
import { useAlarmStore } from "@/stores/alarmStore";
import { useMutation } from "@tanstack/react-query";

export default function Notifications() {
    const alarms = useAlarmStore((state) => state.alarmList);

    const { mutate: readAllNotification } = useMutation({
        mutationFn: readAllAlarm,
        onSuccess: () => {
            useAlarmStore.getState().clear();
        },
        onError: (error) => {
            console.error(error);
        },
    });

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
                {alarms.filter((alarm) => alarm.isRead === false).length ===
                    0 && <p>받은 알림이 없습니다.</p>}
                {alarms
                    .filter((alarm) => alarm.isRead === false)
                    .map((alarm, i) => (
                        <AlertMessage key={i} alarm={alarm} />
                    ))}
            </div>
        </>
    );
}
