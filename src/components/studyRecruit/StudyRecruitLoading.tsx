"use client";

export default function StudyRecruitLoading() {
    return (
        <>
            <div className="relative aspect-[1000/500] w-full">
                <div className="bg-gray300 dark:bg-gray800 absolute inset-0 z-10 animate-pulse" />
            </div>
            <div className="relative mt-0.5 flex h-[50px] w-full items-center justify-center gap-4 px-5">
                <div className="flex w-full justify-center">
                    <button className="relative flex h-full w-[calc(50%-8px)] items-center justify-center">
                        <h5 className="text-gray1000 whitespace-nowrap dark:text-white">
                            정보
                        </h5>
                    </button>
                </div>
                <div className="flex w-full justify-center">
                    <button className="relative flex h-full w-[calc(50%-8px)] items-center justify-center">
                        <h5 className="text-gray500 dark:text-gray700 whitespace-nowrap">
                            팀원 현황
                        </h5>
                    </button>
                </div>
                <div className="border-b-gray400 dark:border-b-gray800 absolute right-5 bottom-0 left-5 border-b">
                    <div className="bg-gray1000 h-[2px] w-[calc(50%-8px)] dark:bg-white" />
                </div>
            </div>

            <div className="w-full animate-pulse px-5">
                <h3 className="bg-gray300 dark:bg-gray800 mt-6 h-5 w-40 rounded" />
                <div className="mt-[10px] flex flex-col gap-2">
                    <div className="bg-gray300 dark:bg-gray800 h-[50px] w-full rounded-xl px-4 py-4" />
                </div>
                <div className="bg-gray100 dark:bg-gray600 -mx-5 mt-6 h-4 w-full" />
                <h3 className="bg-gray300 dark:bg-gray800 mt-6 h-5 w-32 rounded" />
                <div className="mt-4 space-y-2">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-gray300 dark:bg-gray800 h-4 w-2/3 rounded"
                        />
                    ))}
                </div>
                <div className="bg-gray100 dark:bg-gray600 -mx-5 mt-6 h-4 w-full" />
                <h3 className="bg-gray300 dark:bg-gray800 mt-6 h-5 w-24 rounded" />
                <div className="mt-[10px] space-y-2">
                    <div className="bg-gray300 dark:bg-gray800 h-4 w-full rounded" />
                    <div className="bg-gray300 dark:bg-gray800 h-4 w-4/5 rounded" />
                </div>
            </div>
        </>
    );
}
