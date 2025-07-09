"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function SubHeader({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <>
            <div className="h5 relative flex h-[62px] w-full items-center justify-center">
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
