"use client";

export default function MyInfoLoading() {
    return (
        <>
            <div className="flex animate-pulse flex-col items-center justify-center gap-5 pt-4 pb-12">
                <div className="bg-gray300 relative flex h-26 w-26 items-center justify-center rounded-[40px]">
                    <div className="bg-gray200 h-12 w-12 rounded-full" />
                </div>
                <div className="bg-gray200 h-6 w-26 rounded-2xl font-bold"></div>
            </div>
            <div className="border-t-gray200 border-b-gray200 mx-5 flex animate-pulse items-center border-t border-b py-5">
                <div className="bg-gray200 h-4 w-14 rounded" />
                <span className="flex-grow"></span>
                <div className="bg-gray300 mr-1 h-[14px] w-[14px] rounded-full" />
                <div className="bg-gray200 h-4 w-28 rounded" />
            </div>

            <div className="border-b-gray200 mx-5 flex animate-pulse items-center border-b py-5">
                <div className="bg-gray200 h-4 w-14 rounded" />
                <span className="flex-grow"></span>
                <div className="bg-gray200 h-4 w-24 rounded" />
                <div className="bg-gray300 ml-2 h-4 w-4 rounded" />
            </div>

            <div className="border-b-gray200 mx-5 flex animate-pulse items-center border-b py-5">
                <div className="bg-gray200 h-4 w-24 rounded" />
                <span className="flex-grow"></span>
                <div className="bg-gray200 h-4 w-16 rounded" />
                <div className="bg-gray300 ml-2 h-4 w-4 rounded" />
            </div>

            <div className="relative h-[300px] animate-pulse">
                <div className="absolute top-23.5 left-1/2 -translate-x-1/2">
                    <div className="bg-gray200 h-4 w-16 rounded" />
                </div>
            </div>
        </>
    );
}
