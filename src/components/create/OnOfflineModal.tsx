import { useAnimationStore } from "@/stores/modalAnimationStore";
import BottomModal from "../common/BottomModal";
import { useStudyStore } from "@/stores/studyStore";

export default function OnOfflineModal({
    onClose,
    onOff,
    isOpen,
}: {
    onClose: () => void;
    onOff: string;
    isOpen: boolean;
}) {
    const { changeClass } = useAnimationStore();

    return (
        <>
            <BottomModal
                title="온/오프라인"
                onClose={onClose}
                height="140"
                isOpen={isOpen}
            >
                <div className="flex h-12 w-full flex-wrap justify-between gap-2 p-5">
                    <button
                        type="button"
                        onClick={() => {
                            useStudyStore
                                .getState()
                                .setData("region", "온라인");
                            useStudyStore
                                .getState()
                                .setData("region", "온라인");
                            useStudyStore.getState().setData("place", "");
                            changeClass("animate-modalFadeOut");
                            setTimeout(() => {
                                onClose();
                            }, 200);
                        }}
                        className={`h-[48px] w-[calc(50%-4px)] cursor-pointer rounded-[12px] border border-[var(--color-gray300)] duration-200 ease-in-out hover:border-[var(--color-gray400)] ${
                            onOff === "온라인" &&
                            "border-[var(--color-gray1000)] hover:border-[var(--color-gray1000)]"
                        }`}
                    >
                        온라인
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            useStudyStore
                                .getState()
                                .setData("region", "오프라인");
                            useStudyStore.getState().setData("region", "");
                            changeClass("animate-modalFadeOut");
                            setTimeout(() => {
                                onClose();
                            }, 200);
                        }}
                        className={`h-[48px] w-[calc(50%-4px)] cursor-pointer rounded-[12px] border border-[var(--color-gray300)] duration-200 ease-in-out hover:border-[var(--color-gray400)] ${
                            onOff === "오프라인"
                                ? "border-[var(--color-gray1000)] hover:border-[var(--color-gray1000)]"
                                : ""
                        }`}
                    >
                        오프라인
                    </button>
                </div>
            </BottomModal>
        </>
    );
}
