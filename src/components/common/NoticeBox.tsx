"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface NoticeBoxProps {
    notice?: string;
    className?: string;
    isLeader?: boolean;
    onSave?: (newNotice: string) => void;
}

export default function NoticeBox({
    notice,
    className,
    isLeader = false,
    onSave,
}: NoticeBoxProps) {
    const [expanded, setExpanded] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editNotice, setEditNotice] = useState(notice || "");

    const toggleHandler = () => setExpanded((prev) => !prev);

    const handleSave = () => {
        if (onSave) {
            onSave(editNotice);
        }
        setIsEdit(false);
    };

    return (
        <div
            className={`relative h-fit rounded-2xl px-4 backdrop-blur-xl ${className}`}
        >
            <div className="flex items-center justify-between">
                <p className="c2 mt-3 text-[var(--color-gray700)]">공지사항</p>
                <div className="flex items-center gap-2">
                    {isLeader && !isEdit && (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="text-sm text-[var(--color-main500)]"
                        >
                            편집
                        </button>
                    )}
                    <button
                        onClick={toggleHandler}
                        className={`mt-3.5 ${notice ? "flex flex-col" : "hidden"}`}
                    >
                        {expanded ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </div>
            </div>

            <div
                className={`relative flex transition-all duration-600 ${
                    expanded ? "max-h-[500px]" : "max-h-8"
                }`}
            >
                {isEdit ? (
                    <textarea
                        className="c1 w-full resize-none pr-8 text-[var(--color-gray-1000)]"
                        value={editNotice}
                        onChange={(e) => setEditNotice(e.target.value)}
                        rows={3}
                    />
                ) : (
                    <p
                        className={`c1 px-4 leading-4.5 text-[var(--color-gray-1000)] ${
                            expanded
                                ? "line-clamp-none"
                                : "line-clamp-1 text-ellipsis"
                        }`}
                    >
                        {notice}
                    </p>
                )}
            </div>

            <div
                className={`mt-3 flex flex-col items-center ${
                    expanded ? "max-h-[50px]" : "max-h-0"
                } overflow-hidden transition-all duration-150`}
            >
                {isEdit ? (
                    <div className="flex gap-4">
                        <button
                            onClick={handleSave}
                            className="h6 cursor-pointer pb-2 text-[var(--color-main500)]"
                        >
                            저장
                        </button>
                        <button
                            onClick={() => setIsEdit(false)}
                            className="h6 cursor-pointer pb-2 text-[var(--color-gray500)]"
                        >
                            취소
                        </button>
                    </div>
                ) : (
                    notice && (
                        <button
                            onClick={toggleHandler}
                            className="h6 right-0 cursor-pointer pb-2 text-[var(--color-gray1000)]"
                        >
                            접기
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
