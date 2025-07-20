import { ChevronRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import BottomModal from "../common/BottomModal";

export default function MenuModal({
    isOpen,
    onClose,
    setIsUserOpen,
}: {
    isOpen: boolean;
    onClose: () => void;
    setIsUserOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const router = useRouter();
    const params = useParams();
    const id = params?.studyId;
    const studyId = typeof id === "string" ? parseInt(id) : null;

    const userModalHandler = () => {
        setIsUserOpen(true);
        onClose();
    };
    return (
        <>
            <BottomModal
                title="메뉴"
                onClose={onClose}
                height="173"
                isOpen={isOpen}
            >
                <button
                    className="mt-[18px] flex h-[44px] w-full cursor-pointer items-center justify-between transition-all duration-200 ease-in-out hover:bg-[var(--color-gray300)]"
                    onClick={() => {
                        router.push(`/study/${studyId}/studyInfo`);
                    }}
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
            </BottomModal>
        </>
    );
}
