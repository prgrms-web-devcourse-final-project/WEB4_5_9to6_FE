"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function NoticeBox() {
    // 공지사항 열고 닫기
    const [expanded, setExpanded] = useState(false);

    const toggleHandler = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <>
            <div className="fixed h-fit w-full rounded-2xl bg-white/85 px-4 py-3 backdrop-blur">
                <p className="c2 text-[var(--color-gray700)]">07.03 공지사항</p>
                {/* 80글자 제한 */}
                <div className="easy-in-out flex overflow-hidden transition-all duration-300">
                    <p
                        className={`c1 mr-4 leading-4.5 text-[var(--color-gray-1000)] ${expanded ? "line-clamp-none" : "line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap"}`}
                    >
                        오늘은 제가 예비군 일정으로 스터디장 없이 진행하기로
                        결정 되었습니다. 제가 없더라도 각자 미션 수행하시면
                        되겠습니다! 화이팅입니다 여러분 사랑합니다.
                    </p>
                    <button
                        onClick={toggleHandler}
                        className="cursor-pointer pb-2"
                    >
                        {expanded ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </div>
                <div
                    className={`mt-3 ${expanded ? "flex" : "hidden"} flex-col items-center`}
                >
                    <button
                        onClick={toggleHandler}
                        className="h6 cursor-pointer text-[var(--color-gray1000)]"
                    >
                        접기
                    </button>
                </div>
            </div>
        </>
    );
}
