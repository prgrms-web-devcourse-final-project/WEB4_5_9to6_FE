"use client";

export default function StudyCardSkeleton() {
    return (
        <>
            <div className="dark:bg-gray500 mt-3.5 flex min-h-[160px] w-full animate-pulse flex-col rounded-2xl bg-white px-4">
                <div className="flex h-[104px] w-full justify-between py-[14px]">
                    <div className="flex flex-col gap-2">
                        <div className="flex h-[24px] items-center gap-[6px]">
                            <div className="bg-gray200 dark:bg-gray700 h-full w-12 rounded-[8px]" />
                            <div className="bg-gray200 dark:bg-gray700 h-full w-12 rounded-[8px]" />
                        </div>
                        <div className="bg-gray200 dark:bg-gray700 h-5 w-36 rounded" />
                    </div>

                    <div className="bg-gray200 dark:bg-gray700 my-[5px] h-[66px] w-[66px] rounded-[26px] p-[10px]">
                        <div className="bg-gray400 dark:bg-gray900 h-full w-full rounded-full" />
                    </div>
                </div>
                <div className="border-t-gray200 dark:border-t-gray700 h-[53px] border-t pt-2">
                    <div className="bg-gray200 dark:bg-gray700 mb-2 h-4 w-40 rounded" />
                    <div className="flex justify-between">
                        <div className="bg-gray200 dark:bg-gray700 h-4 w-24 rounded" />
                        <div className="bg-gray200 dark:bg-gray700 h-4 w-10 rounded" />
                    </div>
                </div>
            </div>
        </>
    );
}
