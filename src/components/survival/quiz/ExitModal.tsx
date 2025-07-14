"use client";

import Button from "@/components/common/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ExitModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const router = useRouter();
    if (!isOpen) return null;
    return (
        <>
            {isOpen && (
                <div>
                    <div className="fixed inset-0 z-40 bg-black/30"></div>
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-10">
                        <div className="z-30 flex w-full max-w-sm flex-col items-center justify-center rounded-2xl bg-white p-7">
                            <Image
                                src="/icons/Warning.png"
                                alt="warning icon"
                                width={120}
                                height={120}
                                priority
                                style={{
                                    width: "auto",
                                    height: "auto",
                                    marginTop: "4px",
                                }}
                            />
                            <h2 className="h2 mt-6">퀴즈를 종료하시겠어요?</h2>
                            <h5 className="h5 mt-3">
                                지금 나가면 미응시로 처리되어 탈락하게 됩니다.
                            </h5>
                            <div className="mt-12 flex w-full items-center justify-between gap-4">
                                <Button
                                    onClick={onClose}
                                    className="h-12.5 bg-[var(--color-gray200)] text-black hover:bg-[var(--color-gray300)]"
                                >
                                    계속하기
                                </Button>
                                <Button
                                    onClick={() => router.push("/")}
                                    className="h-12.5 bg-[var(--color-main500)] hover:bg-[var(--color-main600)]"
                                >
                                    중단하기
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
