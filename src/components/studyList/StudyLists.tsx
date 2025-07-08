import Image from "next/image";
import flash from "@/assets/Flash--filled.svg";
import SurvivalStudy from "./SurvivalStudy";
import DefaultStudy from "../common/DefaultStudy";

export default function StudyLists() {
    return (
        <>
            {/* 서바이벌 스터디 */}
            <div className="mt-6">
                <div className="flex items-center">
                    <Image src={flash} alt="서바이벌" width={18} height={18} />
                    <h3 className="text-[var(--color-gray1000)]">
                        서바이벌 스터디
                    </h3>
                </div>
                <h6 className="mt-1 text-[var(--color-gray700)]">
                    매주 Ai가 내는 카테고리별 퀴즈를 풀면 생존!
                </h6>
                <div className="hide-scrollbar w-full overflow-x-auto">
                    <div className="mt-[14px] inline-flex gap-[10px]">
                        <SurvivalStudy />
                        <SurvivalStudy />
                        <SurvivalStudy />
                    </div>
                </div>
            </div>

            {/* 스터디 추천 */}
            <h3 className="mt-8 text-[var(--color-gray1000)]">
                어떤 스터디를 하고싶나요?
            </h3>
            <div className="mt-[14px] flex flex-col gap-[16px]">
                <DefaultStudy />
                <DefaultStudy />
                <DefaultStudy />
            </div>
        </>
    );
}
