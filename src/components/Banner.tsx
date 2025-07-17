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
        "/images/banner/_banner01.jpg",
        "/images/banner/_banner02.jpg",
        "/images/banner/_banner03.jpg",
    ];
    return (
        <>
            <div className="mt-3 mb-8 w-full">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{ delay: 3000 }}
                    navigation={{
                        nextEl: ".swiper-button-next-custom",
                        prevEl: ".swiper-button-prev-custom",
                    }}
                    pagination={{
                        clickable: true,
                        type: "bullets",
                    }}
                    loop={true}
                    modules={[Pagination, Autoplay, Navigation]}
                    className="w-full"
                >
                    <div className="swiper-button-prev-custom">
                        <ChevronLeft className="h-8 w-8" />
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
                        <ChevronRight className="h-8 w-8" />
                    </div>
                </Swiper>
            </div>
        </>
    );
}
