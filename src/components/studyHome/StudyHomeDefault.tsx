import { ChevronDown, Users } from "lucide-react";
import StudyGoal from "../studyRecruit/StudyGoal";

export default function studyHomeDefault({ onOpen }: { onOpen: () => void }) {
    return (
        <>
            {/* 공지사항 */}
            <div className="flex h-[61px] w-full items-center justify-between bg-[#1D1D1D]/85 px-5 backdrop-blur-2xl">
                <div className="flex min-w-0 flex-col">
                    <p className="c2 text-[#D6D6D6]">07.03 공지사항</p>
                    <p className="c1 truncate text-[#FFFFFF]">
                        오늘은 제가 예비군 일정으로 스터디장 없이 진행하기
                        바랍니다. 오늘은 제가 예비군 일정으로 스터디장 없이
                        진행하기 바랍니다.
                    </p>
                </div>
                <button className="ml-5 h-5 w-5 flex-shrink-0 cursor-pointer text-[#FFFFFF]">
                    <ChevronDown />
                </button>
            </div>

            {/* 스터디 정보 */}
            <div className="mt-3 w-full">
                <button
                    className="ml-5 flex h-[26px] w-[58px] cursor-pointer items-center justify-center gap-1 rounded-[50px] bg-[var(--color-gray200)] text-[var(--color-gray1000)] hover:bg-[var(--color-gray300)]"
                    onClick={onOpen}
                >
                    <Users className="h-[14px] w-[14px]" />
                    <span className="c2">9/15</span>
                </button>

                {/* 제목,일정 */}
                <p className="mt-3 ml-5 text-[22px] font-semibold text-[var(--color-gray1000)]">
                    숲속에서 함께 라틴어 공부
                </p>
                <p className="b2 mt-2 ml-5 text-[var(--color-gray700)]">
                    매주 수요일 · 15:00~18:00 · 온라인(Zoom)
                </p>

                {/* 스터디 목표 */}
                <StudyGoal />

                {/* 학습 관련 링크 */}
                <div className="w-full px-5">
                    <h3 className="mt-8 text-[var(--color-gray1000)]">
                        학습 관련 링크
                    </h3>
                    <div className="c1 mt-[10px] mb-[10px] flex h-[50px] w-full items-center justify-center rounded-[12px] border border-[var(--color-gray300)] text-[var-(--color-gray1000)]">
                        https://www.inflearn.com/course/suyaisbest
                    </div>
                </div>
            </div>
        </>
    );
}
