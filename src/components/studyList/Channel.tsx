"use client";

import { Dispatch, SetStateAction } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Channel({
    filter,
    selected,
    setSelected,
}: {
    filter: string[];
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

    return (
        <div
            className={`flex h-[50px] w-full gap-4 ${filter.length === 0 && "border-b-gray300 border-b"}`}
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
                            className={`${selected === channel ? `${filter.length === 0 && "tabChoose-active"} text-gray1000` : "text-gray500"} ${filter.length === 0 && "tabChoose"} h-[50px] cursor-pointer py-[14px] text-center`}
                        >
                            <h5>{channel}</h5>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
