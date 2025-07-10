import { X } from "lucide-react";
// import Image from "next/image";
// import avatar from "@/assets/avatar.svg";
import StudyUsers from "../studyInfo/StudyUsers";

export default function StudyHomeUser({ onClose }: { onClose: () => void }) {
    // const users = [
    //     "삼성동오징어(나)",
    //     "대장동꼴뚜기",
    //     "미금역비둘기",
    //     "상봉동 오리아나",
    //     "역병괴수",
    //     "우라늄아이스크림",
    // ];
    return (
        <>
            <div className="fixed inset-0 z-30 bg-[#000000]/30">
                <div className="absolute right-[10px] bottom-5 left-[10px] z-50 flex h-[479px] flex-col rounded-3xl bg-[#FFFFFF] py-5">
                    <div className="flex items-center justify-between">
                        <h3 className="ml-5 text-[var(--color-gray1000)]">
                            스터디원
                        </h3>
                        <X
                            className="mr-5 h-6 w-6 cursor-pointer text-[#161616]"
                            onClick={onClose}
                        />
                    </div>
                    <div className="mt-1">
                        <StudyUsers />
                    </div>
                    {/* <p className="mt-7 c1 text-[var(--color-gray1000)]">
                        총 {users.length}명
                    </p>
                    <div className="mt-4 flex flex-col gap-[12px]">
                        {users.map((user) => (
                            <div
                                key={user}
                                className="flex h-12 w-full items-center justify-between"
                            >
                                <div className="flex items-center">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[var(--color-gray100)]">
                                        <Image
                                            src={avatar}
                                            alt="아바타"
                                            className="h-8 w-8"
                                        />
                                    </div>
                                    <h6 className="ml-[12px] flex items-center text-[var(--color-gray1000)]">
                                        {user}
                                    </h6>
                                </div>
                                <span className="c1 flex items-center text-[#FF395C]">
                                    스터디중
                                </span>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </>
    );
}
