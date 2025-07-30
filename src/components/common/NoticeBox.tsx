"use client";

import { getNotice, patchNotice } from "@/api/studies";
import { customAlert } from "@/utils/customAlert";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

interface NoticeBoxProps {
    notice?: string;
    className?: string;
    // isLeader?: boolean;
    // onSave?: (newNotice: string) => void;
    color?: "default" | "hall";
}

export default function NoticeBox({
    notice,
    className,
    // isLeader = false,
    // onSave,
    color,
}: NoticeBoxProps) {
    const [expanded, setExpanded] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editNotice, setEditNotice] = useState(notice || "");

    const params = useParams();
    const id = params?.studyId;
    const studyId = typeof id === "string" ? parseInt(id) : undefined;

    const pathName = usePathname();
    const isManagePage = pathName.endsWith("/manage");

    const toggleHandler = () => setExpanded((prev) => !prev);
    const { data: noticeData, refetch } = useQuery<string>({
        queryKey: ["noticeData", studyId],
        queryFn: async () => {
            if (!studyId) throw new Error("스터디가 없습니다");
            return await getNotice(studyId);
        },
    });

    const handleSave = async () => {
        // if (onSave) {
        //     onSave(editNotice);
        // }
        if (!studyId) throw new Error("스터디가 없습니다");
        const NoticeRes = await patchNotice(studyId, editNotice);
        // console.log("NoticeRes", NoticeRes);

        if (NoticeRes === "정상적으로 완료되었습니다.") {
            await refetch();
            customAlert({
                message: "공지사항이 수정되었습니다.",
                linkLabel: "닫기",
                onClick: () => {},
            });
        } else {
            customAlert({
                message: "수정하는데 에러가 발생했습니다.",
                linkLabel: "닫기",
                onClick: () => {},
            });
        }
        setIsEdit(false);
        setExpanded(false);
    };

    return (
        <div
            className={`relative h-fit w-full rounded-2xl px-5 backdrop-blur-xl ${className}`}
        >
            <div className="flex w-full items-center justify-between">
                {/* 공지사항 & 내용 */}
                <div className="mr-8 w-full">
                    <p
                        className={`c2 ${color === "hall" ? "green:text-[var(--color-gray500)] text-[#D6D6D6] dark:text-[var(--color-gray500)]" : "text-[var(--color-gray700)] dark:text-[var(--color-gray500)]"}`}
                    >
                        공지사항
                    </p>
                    <div
                        className={`relative mt-1 flex transition-all duration-600 ${
                            expanded ? "max-h-[500px]" : "max-h-8"
                        }`}
                    >
                        {isEdit ? (
                            <textarea
                                className={`c1 w-full resize-none pr-8 ${color === "hall" ? "text-[#FFFFFF]" : "text-[var(--color-gray1000)]"}`}
                                value={editNotice}
                                onChange={(e) => setEditNotice(e.target.value)}
                                rows={3}
                            />
                        ) : (
                            <p
                                className={`c1 leading-4.5 ${color === "hall" ? "text-[#FFFFFF]" : "text-[var(--color-gray1000)]"} ${
                                    expanded
                                        ? "line-clamp-none"
                                        : "line-clamp-1 text-ellipsis"
                                }`}
                            >
                                {noticeData}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-2 flex justify-center gap-2">
                    {isManagePage && !isEdit && (
                        <button
                            onClick={() => {
                                setIsEdit(true);
                                setExpanded(true);
                            }}
                            className="cursor-pointer text-sm whitespace-nowrap text-[var(--color-main500)]"
                        >
                            편집
                        </button>
                    )}
                    <button
                        onClick={toggleHandler}
                        className={`cursor-pointer ${notice ? "flex flex-col" : "hidden"} ${color === "hall" && "text-[#FFFFFF]"}`}
                    >
                        {expanded ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </div>
            </div>

            {/* <div
                className={`relative flex transition-all duration-600 ${
                    expanded ? "max-h-[500px]" : "max-h-8"
                }`}
            >
                {isEdit ? (
                    <textarea
                        className={`c1 w-full resize-none pr-8 ${color === "hall" ? "text-[#FFFFFF]" : "text-[var(--color-gray1000)]"}`}
                        value={editNotice}
                        onChange={(e) => setEditNotice(e.target.value)}
                        rows={3}
                    />
                ) : (
                    <p
                        className={`c1 leading-4.5 ${color === "hall" ? "text-[#FFFFFF]" : "text-[var(--color-gray1000)]"} ${
                            expanded
                                ? "line-clamp-none"
                                : "line-clamp-1 text-ellipsis"
                        }`}
                    >
                        {notice}
                    </p>
                )}
            </div> */}

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
                            onClick={() => {
                                setIsEdit(false);
                                setExpanded(false);
                            }}
                            className="h6 cursor-pointer pb-2 text-[var(--color-gray500)]"
                        >
                            취소
                        </button>
                    </div>
                ) : (
                    notice && (
                        <button
                            onClick={toggleHandler}
                            className={`h6 right-0 cursor-pointer pb-2 ${color === "hall" ? "text-[#FFFFFF]" : "text-[var(--color-gray1000)]"}`}
                        >
                            접기
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
