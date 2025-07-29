"use client";

import Banner from "./Banner";
import StudyTime from "./StudyTime";
import { useThemeStore } from "@/stores/themeStore";
export default function Home() {
    return (
        <>
            {" "}
            <div className="flex flex-row justify-center gap-5">
                <button
                    onClick={() => useThemeStore.getState().setTheme("dark")}
                >
                    다크
                </button>
                <button
                    onClick={() => useThemeStore.getState().setTheme("light")}
                >
                    라이트
                </button>
                <button
                    onClick={() => useThemeStore.getState().setTheme("green")}
                >
                    그린&블랙
                </button>
            </div>
            <Banner />
            <StudyTime />
        </>
    );
}
