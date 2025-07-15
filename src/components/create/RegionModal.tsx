import { useAnimationStore } from "@/stores/modalAnimationStore";
import BottomModal from "../common/BottomModal";

export default function RegionModal({
    onClose,
    region,
    setRegion,
    isOpen,
}: {
    onClose: () => void;
    region: string;
    setRegion: (region: string) => void;
    isOpen: boolean;
}) {
    const regions = [
        "서울",
        "경기",
        "강원",
        "인천",
        "부산",
        "울산",
        "대구",
        "대전",
        "광주",
        "세종",
        "충남",
        "충북",
        "전남",
        "경남",
        "경북",
    ];

    const { changeClass } = useAnimationStore();

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
                                setRegion(r);
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
