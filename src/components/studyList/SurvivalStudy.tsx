import { Users } from "lucide-react";

export default function SurvivalStudy() {
    return (
        <>
            <div className="h-[206px] w-[188px] rounded-[16px] bg-[#E93D5B] px-4 text-white">
                <p className="c2 mt-[17px]">어학</p>
                <h4 className="mt-3">프랑스어 서바이벌</h4>
                <p className="c1 mt-1 h-[96px] text-[#FFD0D8]">
                    몽트뤠조르 사투리 위주의 본토 할머니발음 스터디
                </p>
                <div className="c1 mb-3 flex h-[29px] w-full items-end justify-between border-t border-[#DE4761] text-[#FFD0D8]">
                    <span>8월 15일 시작</span>
                    <div className="flex items-center">
                        <Users className="h-3 w-3" />
                        <span>12/30</span>
                    </div>
                </div>
            </div>
        </>
    );
}
