export default function StudyLoading() {
    return (
        <>
            <div className="relative aspect-[1000/500] w-full animate-pulse">
                <div className="bg-gray300 dark:bg-gray700 absolute inset-0 z-10" />
            </div>
            <div className="bg-gray700 dark:bg-gray900 relative aspect-[360/80] w-full animate-pulse px-4 py-3" />
            <div className="mt-3 w-full animate-pulse">
                <div className="bg-gray300 dark:bg-gray700 ml-5 h-[26px] w-[58px] rounded-[50px]" />
                <div className="bg-gray300 dark:bg-gray700 mt-3 ml-5 h-6 w-3/4 rounded" />
                <div className="bg-gray300 dark:bg-gray700 mt-2 ml-5 h-4 w-5/6 rounded" />
                <div className="bg-gray300 dark:bg-gray700 mt-6 ml-5 h-5 w-2/5 rounded" />
                <div className="bg-gray300 dark:bg-gray700 mt-2 ml-5 h-4 w-4/5 rounded" />
                <div className="bg-gray300 dark:bg-gray700 mt-1 ml-5 h-4 w-3/5 rounded" />

                <div className="px-5">
                    <div className="bg-gray300 dark:bg-gray700 mt-8 h-5 w-[120px] rounded" />
                    <div className="bg-gray300 dark:bg-gray700 mt-[10px] h-[50px] w-full rounded-[12px]" />
                </div>
            </div>
        </>
    );
}
