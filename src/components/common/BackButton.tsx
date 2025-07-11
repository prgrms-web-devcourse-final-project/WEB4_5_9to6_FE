"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ className }: { className: string }) {
    const router = useRouter();
    return (
        <>
            <button
                onClick={() => router.back()}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90"
            >
                <ChevronLeft className={`text-[#161616] ${className}`} />
            </button>
        </>
    );
}
