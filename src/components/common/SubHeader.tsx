"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function SubHeader({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const router = useRouter();

    return (
        <>
            <div
                className={twMerge(
                    "h5 fixed top-0 z-20 flex h-[62px] w-full cursor-default items-center justify-center",
                    className,
                )}
            >
                <ChevronLeft
                    strokeWidth={1.2}
                    size={36}
                    className="absolute top-3 left-2.5 cursor-pointer"
                    onClick={() => router.back()}
                />
                {children}
            </div>
        </>
    );
}
