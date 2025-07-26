"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function LoadingHome() {
    return (
        <>
            <div className="mt-3 mb-8 w-full animate-pulse">
                <div className="relative w-full">
                    <div className="absolute top-1/2 left-2.5 z-10 -translate-y-1/2">
                        <ChevronLeft className="text-gray500 h-8 w-8" />
                    </div>

                    <div className="bg-gray300 h-16 w-full rounded-2xl" />

                    <div className="absolute top-1/2 right-2.5 z-10 -translate-y-1/2">
                        <ChevronRight className="text-gray500 h-8 w-8" />
                    </div>
                </div>
            </div>
            <section>
                <h3 className="h3">로딩 중..</h3>
                <div className="mt-3.5 flex min-h-[165px] w-full animate-pulse flex-col rounded-2xl bg-white p-6">
                    <div className="mt-2 flex">
                        <div className="flex w-1/2 flex-col gap-3">
                            <div className="bg-gray300 h-3 w-[70%] rounded-md"></div>
                            <div className="bg-gray300 h-6 w-[80%] rounded-md"></div>
                        </div>
                        <div className="flex w-1/2 flex-col gap-4">
                            <div className="bg-gray300 h-2 w-full rounded-md"></div>
                            <div className="bg-gray300 h-2 w-[70%] rounded-md"></div>
                            <div className="bg-gray300 h-2 w-[30%] rounded-md"></div>
                            <div className="bg-gray300 h-2 w-[50%] rounded-md"></div>
                        </div>
                    </div>
                    <hr className="text-gray200 mt-5" />
                    <div className="flex items-center justify-center pt-4">
                        <div className="bg-gray300 h-5 w-full rounded-md"></div>
                    </div>
                </div>
            </section>
            <section>
                <h3 className="h3 mt-8">불러오는 중입니다..</h3>
                {[...new Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="mt-3.5 flex min-h-[160px] w-full animate-pulse flex-col rounded-2xl bg-white px-4"
                    >
                        <div className="flex h-[104px] w-full justify-between py-[14px]">
                            <div className="flex flex-col gap-2">
                                <div className="flex h-[24px] items-center gap-[6px]">
                                    <div className="bg-gray300 h-full w-12 rounded-[8px]" />
                                    <div className="bg-gray300 h-full w-12 rounded-[8px]" />
                                </div>
                                <div className="bg-gray300 h-5 w-36 rounded" />
                            </div>

                            <div className="bg-gray300 my-[5px] h-[66px] w-[66px] rounded-[26px] p-[10px]">
                                <div className="bg-gray400 h-full w-full rounded-full" />
                            </div>
                        </div>
                        <div className="border-t-gray300 h-[53px] border-t pt-2 text-[#727272]">
                            <div className="bg-gray300 mb-2 h-4 w-40 rounded" />
                            <div className="flex justify-between">
                                <div className="bg-gray300 h-4 w-24 rounded" />
                                <div className="bg-gray300 h-4 w-10 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
