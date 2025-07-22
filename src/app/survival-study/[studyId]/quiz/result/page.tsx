"use client";

import BackButton from "@/components/common/BackButton";
import ResultMessage from "@/components/survival/ResultMessga";
import { useEffect } from "react";

export default function ResultPage() {
    useEffect(() => {
        window.history.pushState(null, "", window.location.href);

        // 눌러도 소용없음
        const backHandler = () => {
            window.history.go(1);
        };
        window.addEventListener("popstate", backHandler);

        return () => {
            window.removeEventListener("popstate", backHandler);
        };
    }, []);
    return (
        <>
            <div className="relative overflow-hidden">
                <div className="mx-5 flex flex-col">
                    <header className="flex h-15.5 w-full items-center">
                        <BackButton className="h-6 w-6" />
                    </header>
                </div>
                <ResultMessage />
            </div>
        </>
    );
}
