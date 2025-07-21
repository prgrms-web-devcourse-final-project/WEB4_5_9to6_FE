"use client";

import BackButton from "@/components/common/BackButton";
import ResultMessage from "@/components/survival/ResultMessga";

export default function ResultPage() {
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
