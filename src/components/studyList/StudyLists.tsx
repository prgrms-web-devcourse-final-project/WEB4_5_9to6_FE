import Image from "next/image";
import flash from "@/assets/Flash--filled.svg";
import SurvivalCard from "./SurvivalCard";
import StudyCard from "../common/StudyCard";
import avatar from "@/assets/avatar.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function StudyLists() {
    return (
        <>
            {/* 서바이벌 스터디 */}
            <div className="mt-6 pl-5">
                <div className="flex items-center">
                    <Image
                        src={flash}
                        alt="서바이벌"
                        style={{ width: 18, height: "auto" }}
                    />
                    <h3 className="text-[var(--color-gray1000)]">
                        서바이벌 스터디
                    </h3>
                </div>
                <h6 className="mt-1 text-[var(--color-gray700)]">
                    매주 Ai가 내는 카테고리별 퀴즈를 풀면 생존!
                </h6>
                <div className="hide-scrollbar w-full overflow-x-auto">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={"auto"}
                        className="mt-[14px]"
                    >
                        {[...Array(5)].map((_, i) => (
                            <SwiperSlide
                                key={i}
                                style={{ width: "auto" }}
                                className="!flex items-center justify-start"
                            >
                                <SurvivalCard
                                    category="어학"
                                    title="프랑스어 서바이벌"
                                    content="몽트뤠조르 사투리 위주의 본토 할머니발음 스터디"
                                    startDate="8월 15일"
                                    member="12/30"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* 스터디 추천 */}
            <h3 className="mt-8 pl-5 text-[var(--color-gray1000)]">
                어떤 스터디를 하고싶나요?
            </h3>
            <div className="mt-[14px] flex flex-col gap-[16px] px-5">
                <StudyCard
                    category="수능&내신"
                    isNew={true}
                    title="자바를 자바라!!!!!"
                    avatar={avatar}
                    schedule="매주 토요일 12:00~16:00"
                    location="온라인 Slack"
                    member="3/10"
                />
                <StudyCard
                    category="수능&내신"
                    isNew={true}
                    title="자바를 자바라!!!!!"
                    avatar={avatar}
                    schedule="매주 토요일 12:00~16:00"
                    location="온라인 Slack"
                    member="3/10"
                />
                <StudyCard
                    category="수능&내신"
                    isNew={true}
                    title="자바를 자바라!!!!!"
                    avatar={avatar}
                    schedule="매주 토요일 12:00~16:00"
                    location="온라인 Slack"
                    member="3/10"
                />
            </div>
        </>
    );
}
