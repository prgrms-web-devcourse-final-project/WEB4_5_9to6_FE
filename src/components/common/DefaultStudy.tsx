import avatar from "@/assets/avatar.svg";
import { Users } from "lucide-react";
import Image from "next/image";
export default function DefaultStudy() {
    return (
        <>
            <div className="h-[157px] w-[320px] rounded-[16px] bg-white px-4">
                <div className="flex h-[104px] w-full justify-between py-[14px]">
                    <div>
                        {/* 뱃지 */}
                        <div className="flex h-[24px] items-center gap-[6px]">
                            <div className="c2 h-full rounded-[8px] bg-[var(--color-gray200)] px-2 text-[var(--color-gray1000)]">
                                수능&내신
                            </div>
                            <div className="c2 h-full rounded-[8px] bg-[var(--color-gray200)] px-2 text-[#FF395C]">
                                New
                            </div>
                        </div>
                        {/*제목*/}
                        <h4 className="mt-2 text-[var(--color-gray1000)] hover:text-[#727272]">
                            자바를 자바라!!!!!
                        </h4>
                    </div>

                    {/* 아바타 */}
                    <div className="my-[5px] h-[66px] w-[66px] rounded-[26px] bg-[var(--color-gray100)] p-[10px]">
                        <Image
                            src={avatar}
                            alt="아바타이미지"
                            width={46}
                            height={46}
                        />
                    </div>
                </div>

                {/* 일정,장소,인원수 */}
                <div className="h-[53px] border-t border-t-[var(--color-gray200)] text-[#727272]">
                    <p className="c1 mt-[7px] mb-[1px] leading-none">
                        매주 토요일 12:00~16:00
                    </p>
                    <div className="flex justify-between">
                        <span className="c2">온라인 Slack</span>
                        <div className="c1 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            3/10
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
