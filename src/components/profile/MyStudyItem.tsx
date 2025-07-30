import { Check } from "lucide-react";

export default function MyStudyItem({
    closeHandler,
    title,
    selected,
}: {
    closeHandler: () => void;
    title: string;
    selected: boolean;
}) {
    return (
        <>
            <div
                onClick={closeHandler}
                className="hover:bg-gray200 dark:hover:bg-gray900 flex h-11 cursor-pointer items-center justify-between px-5"
            >
                <h6 className="">{title}</h6>
                <Check
                    size={20}
                    className={`${selected ? "text-main500 dark:text-main400" : "dark:text-gray1000 text-white"}`}
                />
            </div>
        </>
    );
}
