"use client";

import { useMyStudyModalStore } from "@/stores/myStudyModalStore";
import { Check, X } from "lucide-react";

export default function MyStudyModal() {
    const { isOpen, closeModal } = useMyStudyModalStore();

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-10">
                <div className="text-gray1000 mx-[10px] flex w-full flex-col rounded-3xl bg-white pb-5">
                    <div className="mx-5 flex h-16 items-center justify-between">
                        <h3>스터디 선택</h3>
                        <X
                            size={20}
                            onClick={closeModal}
                            className="cursor-pointer"
                        />
                    </div>
                    <div
                        onClick={closeModal}
                        className="hover:bg-gray200 flex h-11 cursor-pointer items-center justify-between px-5"
                    >
                        <h6 className="">수코딩 강의로 배우는 프론트엔드</h6>
                        <Check size={20} className="text-main500" />
                    </div>
                    <div
                        onClick={closeModal}
                        className="hover:bg-gray200 flex h-11 cursor-pointer items-center justify-between px-5"
                    >
                        <h6 className="">영어 마스터 스터디</h6>
                        <Check size={20} className="text-white" />
                    </div>
                    <div
                        onClick={closeModal}
                        className="hover:bg-gray200 flex h-11 cursor-pointer items-center justify-between px-5"
                    >
                        <h6 className="">죽음의 서바이벌</h6>
                        <Check size={20} className="text-white" />
                    </div>
                </div>
            </div>
        </>
    );
}
