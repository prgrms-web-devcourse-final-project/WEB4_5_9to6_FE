"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    return (
        <>
            <button
                onClick={() => router.back()}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90"
            >
                <ChevronLeft className="h-5 w-5 text-[#161616]" />
            </button>
        </>
    );
}
