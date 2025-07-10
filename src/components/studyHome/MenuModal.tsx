import { ChevronRight, X } from "lucide-react";

export default function MenuModal({ onClose }: { onClose: () => void }) {
    return (
        <>
            <div className="fixed inset-0 z-30 bg-[#000000]/30">
                <div className="absolute right-[10px] bottom-5 left-[10px] z-50 flex h-[173px] flex-col rounded-3xl bg-[#FFFFFF] px-5 py-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[var(--color-gray1000)]">메뉴</h3>
                        <X
                            className="h-6 w-6 cursor-pointer text-[#161616]"
                            onClick={onClose}
                        />
                    </div>

                    <div className="mt-[18px] flex h-11 w-full cursor-pointer items-center justify-between">
                        <h6 className="text-[var(--color-gray1000)]">
                            스터디 정보
                        </h6>
                        <ChevronRight className="h-5 w-5 text-[var(--color-gray500)]" />
                    </div>
                    <div className="mt-[18px] flex h-11 w-full cursor-pointer items-center justify-between">
                        <h6 className="text-[var(--color-gray1000)]">
                            팀원 현황
                        </h6>
                        <ChevronRight className="h-5 w-5 text-[var(--color-gray500)]" />
                    </div>
                </div>
            </div>
        </>
    );
}
