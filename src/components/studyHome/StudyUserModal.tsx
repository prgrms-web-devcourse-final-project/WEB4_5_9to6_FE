import { X } from "lucide-react";
import StudyUsers from "../studyRecruit/StudyUsers";

export default function StudyHomeUser({ onClose }: { onClose: () => void }) {
    return (
        <>
            <div className="fixed inset-0 z-30 bg-[#000000]/30">
                <div className="absolute right-[10px] bottom-5 left-[10px] z-50 flex h-[479px] flex-col rounded-3xl bg-[#FFFFFF] py-5">
                    <div className="flex items-center justify-between">
                        <h3 className="ml-5 text-[var(--color-gray1000)]">
                            스터디원
                        </h3>
                        <X
                            className="mr-5 h-6 w-6 cursor-pointer text-[#161616]"
                            onClick={onClose}
                        />
                    </div>
                    <div className="mt-1">
                        <StudyUsers />
                    </div>
                </div>
            </div>
        </>
    );
}
