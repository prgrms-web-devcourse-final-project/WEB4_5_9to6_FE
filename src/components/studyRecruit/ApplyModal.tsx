"use-client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ApplyModal({
    isOpen,
    onClose,
    onApply,
}: {
    isOpen: boolean;
    onClose: () => void;
    onApply: () => void;
}) {
    const [applyMent, setApplyMent] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [animationClass, setAnimationClass] = useState("");

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setAnimationClass("animate-modalFadeIn");
        } else {
            setAnimationClass("animate-modalFadeOut");
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const closeHandler = () => {
        setAnimationClass("animate-modalFadeOut");
        setTimeout(() => {
            onClose();
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 bg-[#000000]/30">
                <div
                    className={`${animationClass} absolute top-[137px] left-1/2 z-50 flex h-[355px] w-[340px] -translate-x-1/2 flex-col rounded-[24px] bg-[#FFFFFF] p-5`}
                >
                    <div className="flex h-[65px] w-full items-center justify-between">
                        <h3 className="text-[var(--color-gray1000)]">
                            스터디 신청
                        </h3>
                        <X
                            onClick={closeHandler}
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
                            className="b2 h-full w-full resize-none text-[var(--color-gray500)] outline-none"
                        />
                    </div>

                    <div className="flex h-[90px] w-full items-center gap-2 py-5">
                        <button
                            onClick={closeHandler}
                            className="flex h-[50px] w-[112px] cursor-pointer items-center justify-center rounded-[12px] bg-[var(--color-gray200)] transition-all duration-200 ease-in-out hover:bg-[var(--color-gray300)]"
                        >
                            <h5 className="text-[var(--color-gray1000)]">
                                취소
                            </h5>
                        </button>
                        <button
                            onClick={onApply}
                            className="flex h-[50px] w-[180px] cursor-pointer items-center justify-center rounded-[12px] bg-[var(--color-main500)] transition-all duration-200 ease-in-out hover:bg-[var(--color-main600)]"
                        >
                            <h5 className="text-[var(--color-white)]">
                                신청하기
                            </h5>
                        </button>
                        {/* <Button color="primary" onClick={onApply}>
                            신청하기
                        </Button> */}
                    </div>
                </div>
            </div>
        </>
    );
}
