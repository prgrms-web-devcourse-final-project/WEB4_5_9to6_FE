"use client";

import AlertMessage from "@/components/AlertMessage";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Notifications() {
    const dummyAlerts = Array(6).fill(null);
    const router = useRouter();

    const prevPageHandler = () => {
        router.back();
    };
    return (
        <>
            <header className="fixed h-15.5 w-full bg-white px-4 backdrop-blur-2xl">
                <div className="flex h-full items-center justify-between">
                    <button
                        onClick={prevPageHandler}
                        className="cursor-pointer"
                    >
                        <ChevronLeft />
                    </button>
                    <h6 className="h6">알림</h6>
                    <span className="c2 cursor-pointer pt-5 text-[var(--color-gray600)]">
                        모두읽음
                    </span>
                </div>
            </header>
            <div className="gap-1 pt-16">
                {dummyAlerts.map((_, i) => (
                    <AlertMessage key={i} />
                ))}
            </div>
        </>
    );
}
