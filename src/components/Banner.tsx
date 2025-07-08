import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function Banner() {
    return (
        <>
            <Swiper
                pagination={true}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Image
                        src="/images/banner01.png"
                        alt="banner1"
                        width={320}
                        height={90}
                        sizes="640"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="/images/banner05.png"
                        alt="banner5"
                        width={320}
                        height={90}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="/images/banner03.png"
                        alt="banner3"
                        width={320}
                        height={90}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="/images/banner04.png"
                        alt="banner4"
                        width={320}
                        height={90}
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
