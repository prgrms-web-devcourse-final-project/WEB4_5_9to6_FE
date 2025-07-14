"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface NoticeBoxProps {
    date: string;
    content?: string;
    className?: string;
}
export default function NoticeBox({
    date,
    content,
    className,
}: NoticeBoxProps) {
    // 공지사항 열고 닫기
    const [expanded, setExpanded] = useState(false);

    const toggleHandler = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <>
            <div
                className={`relative h-fit rounded-2xl px-4 backdrop-blur-xl ${className}`}
            >
                <div className="flex items-center justify-between">
                    <p className="c2 text-[var(--color-gray700)]">
                        {date} 공지사항
                    </p>
                    <button
                        onClick={toggleHandler}
                        className="mt-3.5 cursor-pointer"
                    >
                        {expanded ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </div>
                {/* 80글자 제한 */}
                <div
                    className={`relative flex transition-all duration-600 ${expanded ? "max-h-[500px]" : "max-h-8"}`}
                >
                    <p
                        className={`c1 pr-8 leading-4.5 text-[var(--color-gray-1000)] ${expanded ? "line-clamp-none" : "line-clamp-1 text-ellipsis whitespace-nowrap"}`}
                    >
                        {content}
                    </p>
                </div>
                <div
                    className={`mt-3 flex flex-col items-center ${expanded ? "max-h-[50px]" : "max-h-0"} overflow-hidden transition-all duration-150`}
                >
                    <button
                        onClick={toggleHandler}
                        className="h6 right-0 cursor-pointer pb-2 text-[var(--color-gray1000)]"
                    >
                        접기
                    </button>
                </div>
            </div>
        </>
    );
}
