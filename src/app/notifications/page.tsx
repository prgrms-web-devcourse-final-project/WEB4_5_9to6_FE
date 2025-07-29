"use client";

import AlertMessage from "@/components/AlertMessage";
import SubHeader from "@/components/common/SubHeader";
import { useAlarmStore } from "@/stores/alarmStore";

export default function Notifications() {
    const alarms = useAlarmStore((state) => state.alarmList);

    return (
        <>
            <SubHeader>알림</SubHeader>
            <button className="c2 fixed right-5 cursor-pointer pt-5 text-[var(--color-gray600)]">
                모두읽기
            </button>
            <div className="pt-15">
                {alarms.length === 0 && <p>받은 알림이 없습니다.</p>}
                {alarms.map((alarm, i) => (
                    <AlertMessage key={i} alarm={alarm} />
                ))}
            </div>
        </>
    );
}
