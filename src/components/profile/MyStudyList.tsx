"use client";

import StudyCard from "../common/StudyCard";
import avatar from "@/assets/avatar.svg";

export default function MyStudyList() {
    const myStudies = [
        "스터디내용1",
        "스터디내용2",
        "스터디내용3",
        "스터디내용4",
        "스터디내용5",
    ];
    // 아직 타입이 정해지지 않아 문자열 배열로 둚

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4">
                {myStudies.length > 0 ? (
                    myStudies.map((v) => (
                        <StudyCard
                            key={v}
                            category="수능&내신"
                            isNew={true}
                            title={v}
                            avatar={avatar}
                            schedule="매주 토요일 12:00~16:00"
                            location="온라인 Slack"
                            member="3/10"
                        />
                    ))
                ) : (
                    <>
                        <p className="text-gray500 mt-10">
                            가입한 스터디가 없습니다
                        </p>
                    </>
                )}
            </div>
        </>
    );
}
