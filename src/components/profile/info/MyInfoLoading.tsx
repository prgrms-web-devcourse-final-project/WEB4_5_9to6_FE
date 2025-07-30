"use client";

export default function MyInfoLoading() {
    return (
        <>
            <div className="flex animate-pulse flex-col items-center justify-center gap-5 pt-4 pb-12">
                <div className="bg-gray300 dark:bg-gray800 relative flex h-26 w-26 items-center justify-center rounded-[40px]">
                    <div className="bg-gray200 dark:bg-gray700 h-12 w-12 rounded-full" />
                </div>
                <div className="bg-gray200 dark:bg-gray700 h-6 w-26 rounded-2xl font-bold"></div>
            </div>
            <div className="border-t-gray200 dark:border-t-gray700 dark:border-b-gray700 border-b-gray200 mx-5 flex animate-pulse items-center border-t border-b py-5">
                <div className="bg-gray200 dark:bg-gray700 h-4 w-full rounded" />
            </div>

            <div className="border-b-gray200 dark:border-b-gray700 mx-5 flex animate-pulse items-center border-b py-5">
                <div className="bg-gray200 dark:bg-gray700 h-4 w-full rounded" />
            </div>

            <div className="border-b-gray200 dark:border-b-gray700 mx-5 flex animate-pulse items-center border-b py-5">
                <div className="bg-gray200 dark:bg-gray700 h-4 w-full rounded" />
            </div>
        </>
    );
}
