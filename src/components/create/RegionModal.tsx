import { useAnimationStore } from "@/stores/modalAnimationStore";
import BottomModal from "../common/BottomModal";
import { useStudyStore } from "@/stores/studyStore";

export default function RegionModal({
    onClose,
    isOpen,
}: {
    onClose: () => void;
    isOpen: boolean;
}) {
    const regions = [
        "서울",
        "경기",
        "인천",
        "강원",
        "대구",
        "대전",
        "울산",
        "부산",
        "광주",
        "세종",
        "충남",
        "충북",
        "전남",
        "전북",
        "경남",
        "경북",
        "제주",
    ];

    const { changeClass } = useAnimationStore();
    const region = useStudyStore((state) => state.studyData.region);

    return (
        <>
            <BottomModal
                title="지역"
                onClose={onClose}
                height="411"
                isOpen={isOpen}
            >
                <div className="flex h-12 w-full flex-wrap gap-2 p-5">
                    {regions.map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => {
                                useStudyStore.getState().setData("region", r);
                                changeClass("animate-modalFadeOut");
                                setTimeout(() => {
                                    onClose();
                                }, 200);
                            }}
                            className={`border-gray300 dark:border-gray800 text-gray1000 hover:border-gray400 dark:hover:border-gray700 h-[48px] w-[calc(33%-5px)] cursor-pointer rounded-[12px] border duration-200 ease-in-out dark:text-white ${
                                region === r
                                    ? "border-gray1000 hover:border-gray1000 dark:border-white dark:hover:border-white"
                                    : ""
                            }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </BottomModal>
        </>
    );
}
