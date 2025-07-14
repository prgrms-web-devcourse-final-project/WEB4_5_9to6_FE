import BottomModal from "../common/BottomModal";

export default function CategoryModal({
    onClose,
    category,
    setCategory,
}: {
    onClose: () => void;
    category: string;
    setCategory: (category: string) => void;
}) {
    const categories = [
        "어학",
        "취업",
        "고시&공무원",
        "프로그래밍&IT",
        "수능&내신",
        "기타",
    ];

    return (
        <BottomModal title="스터디 카테고리" onClose={onClose} height="245">
            <div className="flex h-12 w-full flex-wrap justify-between gap-2 p-5">
                {categories.map((c) => (
                    <button
                        key={c}
                        type="button"
                        onClick={() => {
                            setCategory(c);
                            onClose();
                        }}
                        className={`h-[48px] w-[calc(50%-4px)] cursor-pointer rounded-[12px] border border-[var(--color-gray300)] duration-200 ease-in-out hover:border-[var(--color-gray400)] ${
                            category === c
                                ? "border-[var(--color-gray1000)] hover:border-[var(--color-gray1000)]"
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
