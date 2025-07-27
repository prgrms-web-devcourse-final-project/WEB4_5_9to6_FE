"use client";

import { useAuthStore } from "@/stores/authStore";
import Banner from "./Banner";
import StudyTime from "./StudyTime";
import LoadingHome from "./LoadingHome";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
    const { isFetched } = useAuthStore();

    return (
        <>
            {isFetched ? (
                <>
                    <Banner />
                    <StudyTime />
                </>
            ) : (
                <>
                    <div className="mt-3 mb-8 w-full animate-pulse">
                        <div className="relative w-full">
                            <div className="absolute top-1/2 left-2.5 z-10 -translate-y-1/2">
                                <ChevronLeft className="text-gray300 h-8 w-8" />
                            </div>

                            <div className="bg-gray200 h-16 w-full rounded-2xl" />

                            <div className="absolute top-1/2 right-2.5 z-10 -translate-y-1/2">
                                <ChevronRight className="text-gray300 h-8 w-8" />
                            </div>
                        </div>
                    </div>
                    <LoadingHome />
                </>
            )}
        </>
    );
}
