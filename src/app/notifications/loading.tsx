import SubHeader from "@/components/common/SubHeader";

export default function loading() {
    return (
        <>
            <SubHeader>알림</SubHeader>
            <div className="pt-15">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="m-5 flex w-[90%] animate-pulse items-center justify-center"
                    >
                        <div className="bg-gray200 dark:bg-gray700 relative mr-4 h-12 w-12 shrink-0 rounded-2xl" />
                        <div className="flex h-12 w-full flex-col justify-center gap-1">
                            <div className="bg-gray300 dark:bg-gray800 h-4 w-3/5 rounded" />
                            <div className="bg-gray300 dark:bg-gray800 h-4 w-4/5 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
