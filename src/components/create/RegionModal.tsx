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
                height="360"
                isOpen={isOpen}
            >
                <div className="flex h-12 w-full flex-wrap justify-between gap-2 p-5">
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
                            className={`h-[48px] w-[calc(33%-5px)] cursor-pointer rounded-[12px] border border-[var(--color-gray300)] duration-200 ease-in-out hover:border-[var(--color-gray400)] ${
                                region === r
                                    ? "border-[var(--color-gray1000)] hover:border-[var(--color-gray1000)]"
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
