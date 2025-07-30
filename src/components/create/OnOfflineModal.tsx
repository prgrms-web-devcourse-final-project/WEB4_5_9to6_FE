import { useAnimationStore } from "@/stores/modalAnimationStore";
import BottomModal from "../common/BottomModal";
import { useStudyStore } from "@/stores/studyStore";

export default function OnOfflineModal({
    onClose,
    isOpen,
}: {
    onClose: () => void;
    isOpen: boolean;
}) {
    const { changeClass } = useAnimationStore();
    const isOnline = useStudyStore((state) => state.studyData.online);

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
                            useStudyStore.getState().setData("online", true);
                            useStudyStore
                                .getState()
                                .setData("region", "온라인");
                            useStudyStore.getState().setData("place", "");
                            changeClass("animate-modalFadeOut");
                            setTimeout(() => {
                                onClose();
                            }, 200);
                        }}
                        className={`text-gray1000 border-gray300 dark:border-gray800 hover:border-gray400 dark:hover:border-gray700 h-[48px] w-[calc(50%-4px)] cursor-pointer rounded-[12px] border duration-200 ease-in-out dark:text-white ${
                            isOnline === true &&
                            "border-gray1000 hover:border-gray1000 dark:border-white dark:hover:border-white"
                        }`}
                    >
                        온라인
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            useStudyStore.getState().setData("online", false);
                            useStudyStore.getState().setData("region", "");
                            changeClass("animate-modalFadeOut");
                            setTimeout(() => {
                                onClose();
                            }, 200);
                        }}
                        className={`text-gray1000 border-gray300 dark:border-gray800 hover:border-gray400 dark:hover:border-gray700 h-[48px] w-[calc(50%-4px)] cursor-pointer rounded-[12px] border duration-200 ease-in-out dark:text-white ${
                            isOnline === false &&
                            "border-gray1000 hover:border-gray1000 dark:border-white dark:hover:border-white"
                        }`}
                    >
                        오프라인
                    </button>
                </div>
            </BottomModal>
        </>
    );
}
