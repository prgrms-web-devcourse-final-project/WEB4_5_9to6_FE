import { useAnimationStore } from "@/stores/modalAnimationStore";
import BottomModal from "../common/BottomModal";

export default function CategoryModal({
    onClose,
    category,
    setCategory,
    isOpen,
}: {
    onClose: () => void;
    category: string;
    setCategory: (column: string, category: string) => void;
    isOpen: boolean;
}) {
    const categories = [
        "어학",
        "취업",
        "고시&공무원",
        "프로그래밍&IT",
        "수능&내신",
        "기타",
    ];

    const { changeClass } = useAnimationStore();

    return (
        <BottomModal
            title="스터디 카테고리"
            onClose={onClose}
            height="245"
            isOpen={isOpen}
        >
            <div className="flex h-12 w-full flex-wrap justify-between gap-2 p-5">
                {categories.map((c) => (
                    <button
                        key={c}
                        type="button"
                        onClick={() => {
                            setCategory("category", c);
                            changeClass("animate-modalFadeOut");
                            setTimeout(() => {
                                onClose();
                            }, 200);
                        }}
                        className={`border-gray300 dark:border-gray800 text-gray1000 hover:border-gray400 dark:hover:border-gray700 h-[48px] w-[calc(50%-4px)] cursor-pointer rounded-[12px] border duration-200 ease-in-out dark:text-white ${
                            category === c
                                ? "border-gray1000 hover:border-gray1000 dark:border-white dark:hover:border-white"
                                : ""
                        }`}
                    >
                        {c}
                    </button>
                ))}
            </div>
        </BottomModal>
    );
}
