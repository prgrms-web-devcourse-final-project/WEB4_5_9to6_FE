"use client";

import { Dispatch, SetStateAction } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
interface Filtering {
    region: string;
    status: string;
    regionSelect: boolean;
    statusSelect: boolean;
}
export default function Channel({
    filter,
    selected,
    setSelected,
}: {
    filter: Filtering;
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
}) {
    const channels = [
        "전체",
        "어학",
        "취업",
        "프로그래밍",
        "고시&공무원",
        "수능&내신",
        "기타",
    ];
    // const removeFilter = (remove: string) => {
    //     setFilter(filter.filter((prev) => prev !== remove));
    //     // console.log("필터:", filter);
    // };
    return (
        <>
            <div
                className={`flex w-full gap-4 ${!filter.regionSelect && !filter.statusSelect && "border-b-gray300 border-b"} ${!filter.regionSelect && !filter.statusSelect ? "h-[50px]" : "h-[45px]"}`}
            >
                <Swiper spaceBetween={16} slidesPerView={"auto"}>
                    {channels.map((channel) => (
                        <SwiperSlide
                            key={channel}
                            style={{ width: "auto" }}
                            className="!flex items-center justify-start"
                        >
                            <div
                                onClick={() => {
                                    setSelected(channel);
                                }}
                                className={`${selected === channel ? `${!filter.regionSelect && !filter.statusSelect && "tabChoose-active"} text-gray1000` : "text-gray500"} ${filter.region === "ALL" && filter.status === "활동 전체" && "tabChoose"} h-[50px] cursor-pointer py-[14px] text-center`}
                            >
                                <h5>{channel}</h5>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* {filter.length > 0 && (
                <div className="mt-[-10px] flex h-6 items-center gap-[8px]">
                    {filter?.map((fil) => (
                        <button
                            key={fil}
                            className="flex h-full w-auto cursor-pointer items-center rounded-3xl bg-[#454545] px-[9px] text-[11px] text-[#FFFFFF]"
                            onClick={() => removeFilter(fil)}
                        >
                            {fil}
                        </button>
                    ))}
                </div>
            )} */}
        </>
    );
}
