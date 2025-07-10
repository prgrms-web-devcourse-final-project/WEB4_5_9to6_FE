"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function NoticeBox() {
    const [expanded, setExpanded] = useState(false);

    const toggleHandler = () => setExpanded((prev) => !prev);
    return (
        <>
            <div className="mx-5rounded-2xl bg-white/85 backdrop-blur-lg">
                <p className="c2 text-[var(--color-gray700)]">07.03 공지사항</p>
                {/* 80글자 제한 */}
                <div className="flex">
                    <p
                        className={`c1 my-5 mr-4 text-[var(--color-gray-1000)] ${expanded ? "line-clamp-none" : "line-clamp-1"}`}
                    >
                        오늘은 제가 예비군 일정으로 스터디장 없이 진행하기로
                        결정 되었습니다. 제가 없더라도 각자 미션 수행하시면
                        되겠습니다! 화이팅
                    </p>
                    <div className="">
                        <button
                            onClick={toggleHandler}
                            className="cursor-pointer"
                        >
                            <ChevronDown />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
