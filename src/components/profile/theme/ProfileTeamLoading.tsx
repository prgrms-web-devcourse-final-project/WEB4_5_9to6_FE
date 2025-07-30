"use client";

export default function ProfileTeamLoading() {
    return (
        <>
            <div className="relative mt-0.5 flex h-[50px] w-full items-center justify-center gap-4 px-5">
                <div className="flex w-full justify-center">
                    <button className="relative flex h-full w-[calc(50%-8px)] items-center justify-center">
                        <h5 className="text-gray1000 whitespace-nowrap dark:text-white">
                            앱 테마
                        </h5>
                    </button>
                </div>
                <div className="flex w-full justify-center">
                    <button className="relative flex h-full w-[calc(50%-8px)] items-center justify-center">
                        <h5 className="text-gray500 dark:text-gray700 whitespace-nowrap">
                            스터디룸
                        </h5>
                    </button>
                </div>
                <div className="flex w-full justify-center">
                    <button className="relative flex h-full w-[calc(50%-8px)] items-center justify-center">
                        <h5 className="text-gray500 dark:text-gray700 whitespace-nowrap">
                            아바타
                        </h5>
                    </button>
                </div>
                <div className="border-b-gray400 dark:border-b-gray800 absolute right-5 bottom-0 left-5 border-b">
                    <div className="bg-gray1000 h-[2px] w-[calc(33%-8px)] dark:bg-white" />
                </div>
            </div>
            <div className="h-[calc(100vh-200px)] py-6">
                <div className="mx-5 mb-[90px] grid grid-cols-2 gap-6">
                    <div className="flex animate-pulse flex-col gap-[10px]">
                        <div className="flex items-center gap-1">
                            <div className="bg-gray300 dark:bg-gray800 h-4 w-16 rounded" />
                        </div>
                        <div className="bg-gray300 dark:bg-gray800 relative aspect-[31/57] w-full overflow-hidden rounded-xl"></div>
                    </div>
                    <div className="flex animate-pulse flex-col gap-[10px]">
                        <div className="flex items-center gap-1">
                            <div className="bg-gray300 dark:bg-gray800 h-4 w-16 rounded" />
                        </div>
                        <div className="bg-gray300 dark:bg-gray800 relative aspect-[31/57] w-full overflow-hidden rounded-xl"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
