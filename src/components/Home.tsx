"use client";

import { useAuthStore } from "@/stores/authStore";
import Banner from "./Banner";
import StudyTime from "./StudyTime";
import LoadingSpinner from "./common/LoadingSpinner";

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
                    <LoadingSpinner />
                </>
            )}
        </>
    );
}
