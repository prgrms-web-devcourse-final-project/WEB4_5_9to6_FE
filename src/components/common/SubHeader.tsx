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
                    "text-gray1000 h5 fixed top-0 z-20 flex h-[62px] w-full cursor-default items-center justify-center duration-200 ease-in dark:text-white",
                    className,
                )}
            >
                <ChevronLeft
                    strokeWidth={1.2}
                    size={36}
                    className="absolute top-3 left-2.5 cursor-pointer text-[#161616] duration-200 ease-in dark:text-white"
                    onClick={() => router.back()}
                />
                {children}
            </div>
        </>
    );
}
