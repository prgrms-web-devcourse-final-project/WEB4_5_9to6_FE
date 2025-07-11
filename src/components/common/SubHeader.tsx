"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

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
                className={`h5 fixed top-0 z-2 flex h-[62px] w-full max-w-sm cursor-default items-center justify-center bg-white ${className}`}
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
