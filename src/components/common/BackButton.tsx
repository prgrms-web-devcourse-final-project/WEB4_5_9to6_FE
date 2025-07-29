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
                className="green:bg-[#222]/90 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 backdrop-blur-[10px] dark:bg-[#222]/90"
            >
                <ChevronLeft
                    className={`text-[#161616] ${className} green:text-white dark:text-white`}
                />
            </button>
        </>
    );
}
