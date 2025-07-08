import avatar from "@/assets/avatar.svg";
import Image from "next/image";
export default function DefaultStudy() {
    return (
        <>
            <div className="h-[157px] w-[320px] rounded-[16px] bg-white px-4">
                <div className="flex h-[76px] w-full justify-between">
                    {/* 뱃지+제목 */}
                    <div className="pt-[14px]">
                        {/* 분류, new 뱃지 */}
                        <div className="bg-gray200 text-gray1000 c2 h-[24px] rounded-[8px]">
                            수능&내신
                        </div>
                        <div className="bg-gray200 c2 h-[24px] rounded-[8px] text-[#FF395C]">
                            New
                        </div>

                        {/*제목*/}
                        <p className="text-gray1000 h4">자바를 자바라!!!!!</p>
                    </div>
                    {/* 아바타 */}
                    <div className="bg-gray100 my-[5px] h-[66px] w-[66px] p-[10px]">
                        <Image
                            src={avatar}
                            alt="아바타이미지"
                            width={46}
                            height={46}
                        />
                    </div>
                </div>
                {/* 일정,장소,인원수 */}
                <div className="c1 border-t-gray200 h-[53px] border-t text-[#727272]">
                    <p> 매주 토요일 12:00~16:00</p>
                    <div className="flex justify-between">
                        <span>온라인 Slack</span>
                        <span>3/10</span>
                    </div>
                </div>
            </div>
        </>
    );
}
