"use-client";
import { X } from "lucide-react";
import { useState } from "react";

export default function ApplyModal({
    onClose,
    onApply,
}: {
    onClose: () => void;
    onApply: () => void;
}) {
    const [applyMent, setApplyMent] = useState("");
    return (
        <>
            <div className="fixed inset-0 z-30 bg-[#000000]/30">
                <div className="absolute top-[137px] left-1/2 z-50 flex h-[355px] w-[340px] -translate-x-1/2 flex-col rounded-[24px] bg-[#FFFFFF] p-5">
                    <div className="flex h-[65px] w-full items-center justify-between">
                        <h3 className="text-[var(--color-gray1000)]">
                            스터디 신청
                        </h3>
                        <X
                            onClick={onClose}
                            className="h-6 w-6 cursor-pointer text-[#161616]"
                        />
                    </div>

                    <p className="b2 text-[var(--color-gray1000)]">
                        하고싶은 말
                    </p>
                    <div className="mt-2 h-[162px] w-full rounded-[12px] border border-[var(--color-gray300)] p-4">
                        <textarea
                            value={applyMent}
                            placeholder="스터디에 참여하고 싶은 이유를 함께 적어주세요. (50자 이내)"
                            onChange={(e) => setApplyMent(e.target.value)}
                            className="b2 h-full w-full text-[var(--color-gray500)] outline-none"
                        />
                    </div>

                    <div className="flex h-[90px] w-full items-center gap-2 py-5">
                        <button
                            onClick={onClose}
                            className="flex h-[50px] w-[112px] cursor-pointer items-center justify-center rounded-[12px] bg-[var(--color-gray200)]"
                        >
                            <h5 className="text-[var(--color-gray1000)]">
                                취소
                            </h5>
                        </button>

                        <button
                            onClick={onApply}
                            className="flex h-[50px] w-[180px] cursor-pointer items-center justify-center rounded-[12px] bg-[#E02D4D] hover:bg-[#D31D3E]"
                        >
                            <h5 className="text-[var(--color-white)]">
                                신청하기
                            </h5>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
