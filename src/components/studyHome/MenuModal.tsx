import { ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function MenuModal({
    onClose,
    setIsUserOpen,
}: {
    onClose: () => void;
    setIsUserOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const router = useRouter();
    const userModalHandler = () => {
        setIsUserOpen(true);
        onClose();
    };
    return (
        <>
            <div className="fixed inset-0 z-30 bg-[#000000]/30">
                <div className="absolute right-[10px] bottom-5 left-[10px] z-50 flex h-[173px] flex-col rounded-3xl bg-[#FFFFFF] py-5">
                    <div className="flex items-center justify-between px-5">
                        <h3 className="text-[var(--color-gray1000)]">메뉴</h3>
                        <X
                            className="h-6 w-6 cursor-pointer text-[#161616]"
                            onClick={onClose}
                        />
                    </div>

                    <button
                        className="mt-[18px] flex h-[44px] w-full cursor-pointer items-center justify-between transition-all duration-200 ease-in-out hover:bg-[var(--color-gray300)]"
                        onClick={() => router.push("/study/home/1/studyInfo")}
                    >
                        <h6 className="ml-5 text-[var(--color-gray1000)]">
                            스터디 정보
                        </h6>
                        <ChevronRight className="mr-5 h-5 w-5 text-[var(--color-gray500)]" />
                    </button>
                    <button
                        className="flex h-[44px] w-full cursor-pointer items-center justify-between transition-all duration-200 ease-in-out hover:bg-[var(--color-gray300)]"
                        onClick={userModalHandler}
                    >
                        <h6 className="ml-5 text-[var(--color-gray1000)]">
                            팀원 현황
                        </h6>
                        <ChevronRight className="mr-5 h-5 w-5 text-[var(--color-gray500)]" />
                    </button>
                </div>
            </div>
        </>
    );
}
