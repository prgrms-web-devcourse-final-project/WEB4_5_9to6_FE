export default function SurvivalStudyLoading() {
    return (
        <>
            <div className="relative aspect-[1000/500] w-full">
                <div className="bg-gray300 dark:bg-gray800 absolute inset-0 z-10 animate-pulse" />
            </div>
            <div className="bg-gray500 dark:bg-gray1000 relative aspect-[6/1] w-full animate-pulse px-4 py-3" />
            <div className="mt-6 mb-7 w-full animate-pulse px-5">
                <div className="bg-gray300 dark:bg-gray800 mx-auto h-6 w-36 rounded-lg" />
                <div className="bg-gray300 dark:bg-gray800 mx-auto mt-[15px] h-7 w-3/4 rounded" />
                <div className="bg-gray300 dark:bg-gray800 mx-auto mt-2 h-4 w-2/3 rounded" />
                <div className="bg-gray300 dark:bg-gray800 mx-auto mt-6 h-5 w-32 rounded" />
            </div>
            <hr className="text-gray200 dark:bg-gray700 mx-5 mt-6" />
            <div className="mb-7 w-full animate-pulse px-5">
                <div className="bg-gray300 dark:bg-gray800 mt-6 h-5 w-24 rounded" />
                <div className="mt-[10px] flex flex-col gap-2">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-gray200 dark:bg-gray700 flex h-[50px] w-full items-center justify-between rounded-xl px-4 py-4"
                        ></div>
                    ))}
                </div>
            </div>
        </>
    );
}
