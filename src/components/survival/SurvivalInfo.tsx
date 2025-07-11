import Image from "next/image";

export default function SurvivalInfo() {
    const schedule = [
        { goal: "토익 문법, 어휘 2/5 이상 점수 시 생존", reward: "200" },
        { goal: "토익 문법, 어휘 2/5 이상 점수 시 생존", reward: "300" },
        { goal: "토익 문법, 어휘 2/5 이상 점수 시 생존", reward: "400" },
        { goal: "토익 문법, 어휘 2/5 이상 점수 시 생존", reward: "500" },
    ];
    return (
        <>
            <div className="mt-6 mb-7 w-full overflow-scroll px-5">
                <div className="flex h-6 items-center justify-center gap-1.5">
                    <div className="c2 h-full rounded-lg bg-[var(--color-gray1000)] px-2 text-white">
                        프로그래밍
                    </div>
                    <div className="c2 flex h-full rounded-lg bg-[var(--color-main400)] px-2 text-white">
                        <Image
                            src="/icons/flash.svg"
                            alt="survival icon"
                            width={14}
                            height={14}
                        />
                        서바이벌
                    </div>
                </div>
                <h2 className="h2 mt-[15px] flex justify-center text-[var(--color-gray1000)]">
                    토익 고급 살아남기
                </h2>
                <p className="mt-1.5 text-center text-[var(--color-gray700)]">
                    매주 수요일 · 15:00~18:00 · 온라인
                </p>
                <h4 className="h4 mt-6.5 text-center">참가자 : 30명</h4>
            </div>
            <hr className="mx-5 mt-6 text-[var(--color-gray200)]" />
            <div className="mb-7 w-full px-5">
                <h3 className="mt-6">서바이벌 목표</h3>
                <div className="mt-[10px] flex flex-col gap-2">
                    {schedule.map((schedule, index) => (
                        <div
                            key={index}
                            className="flex h-[50px] w-full items-center justify-between rounded-[12px] bg-[var(--color-gray100)] px-4 py-4"
                        >
                            <div className="flex">
                                <p className="c1 mr-3 font-medium text-[var(--color-gray1000)]">
                                    {index + 1}주차
                                </p>
                                <p className="c1 text-[var(--color-gray1000)]">
                                    {schedule.goal}
                                </p>
                            </div>
                            <p className="text-[var(--color-main400)]">
                                {schedule.reward}P
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
