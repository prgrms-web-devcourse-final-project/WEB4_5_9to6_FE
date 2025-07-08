"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Banner() {
    const bannerImages = [
        "/images/banner/banner02.png",
        "/images/banner/banner01.png",
        "/images/banner/banner03.png",
        "/images/banner/banner04.png",
        "/images/banner/banner05.png",
    ];
    return (
        <>
            <div className="mt-3 w-full">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{ delay: 5000 }}
                    navigation={{
                        nextEl: ".swiper-button-next-custom",
                        prevEl: ".swiper-button-prev-custom",
                    }}
                    pagination={{
                        clickable: true,
                        type: "bullets",
                    }}
                    modules={[Pagination, Autoplay, Navigation]}
                    className="w-5/7"
                >
                    <div className="swiper-button-prev-custom">
                        <ChevronLeft />
                    </div>
                    {bannerImages.map((src, idx) => (
                        <SwiperSlide key={idx}>
                            <Image
                                src={src}
                                alt={`banner${idx + 1}`}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full rounded-2xl"
                            />
                        </SwiperSlide>
                    ))}
                    <div className="swiper-button-next-custom">
                        <ChevronRight />
                    </div>
                </Swiper>
            </div>
        </>
    );
}
