"use client";
import StudyHomeInfo from "@/components/studyHome/StudyHomeInfo";
import StudyUsers from "@/components/studyRecruit/StudyUsers";
import { useState } from "react";

export default function Page() {
    const [channel, setChannel] = useState("정보");
    return (
        <>
            <div className="min-h-screen min-w-[360px]">
                {/* 채널(정보/팀원현황) */}
                <div className="mt-0.5 flex h-[50px] w-full items-center justify-center gap-4 border-b border-b-[var(--color-gray300)] px-5">
                    <button
                        onClick={() => setChannel("정보")}
                        className={`flex h-full w-full cursor-pointer items-center justify-center border-b-2 ${channel === "정보" ? "border-b-[var(--color-gray1000)] text-[var(--color-gray1000)]" : "border-b-[var(--color-white)] text-[var(--color-gray500)]"}`}
                    >
                        정보
                    </button>
                    <button
                        onClick={() => setChannel("팀원 현황")}
                        className={`flex h-full w-full cursor-pointer items-center justify-center border-b-2 ${channel === "팀원 현황" ? "border-b-[var(--color-gray1000)] text-[var(--color-gray1000)]" : "border-b-[var(--color-white)] text-[var(--color-gray500)]"}`}
                    >
                        팀원 현황
                    </button>
                </div>

                {/* 정보 */}
                {channel === "정보" && <StudyHomeInfo />}
                {/* 팀원현황 */}
                {channel === "팀원 현황" && <StudyUsers />}
            </div>
        </>
    );
}
