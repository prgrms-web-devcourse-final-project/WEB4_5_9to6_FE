"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({
    className,
    onExitClick,
}: {
    className: string;
    onExitClick?: () => void;
}) {
    const router = useRouter();
    const handleClick = () => {
        if (onExitClick) {
            onExitClick();
        } else {
            router.back();
        }
    };
    return (
        <>
            <button
                onClick={handleClick}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90"
            >
                <ChevronLeft className={`text-[#161616] ${className}`} />
            </button>
        </>
    );
}
