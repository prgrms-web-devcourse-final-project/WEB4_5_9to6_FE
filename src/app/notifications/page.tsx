"use client";

import AlertMessage from "@/components/AlertMessage";
import SubHeader from "@/components/common/SubHeader";

export default function Notifications() {
    const dummyAlerts = Array(6).fill(null);

    return (
        <>
            <SubHeader>알림</SubHeader>
            <button className="c2 fixed right-5 cursor-pointer pt-5 text-[var(--color-gray600)]">
                모두읽기
            </button>
            <div className="pt-15">
                {dummyAlerts.map((_, i) => (
                    <AlertMessage key={i} />
                ))}
            </div>
        </>
    );
}
