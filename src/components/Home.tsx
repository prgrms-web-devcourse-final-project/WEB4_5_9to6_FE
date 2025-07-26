"use client";

import { useAuthStore } from "@/stores/authStore";
import Banner from "./Banner";
import StudyTime from "./StudyTime";
import LoadingHome from "./LoadingHome";

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
                    <LoadingHome />
                </>
            )}
        </>
    );
}
