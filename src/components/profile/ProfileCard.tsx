"use client";

import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";
import medal from "../../assets/images/medal.png";
import avatar from "../../assets/images/avatar.png";

export default function ProfileCard() {
    return (
        <>
            <div className="flex w-full items-center justify-between p-6">
                <div className="flex flex-col gap-1">
                    <p className="text-gray1000 text-2xl font-bold">
                        죽음의고양이
                    </p>
                    <p className="text-gray700 b2 mb-4">가입된 스터디 3개</p>
                    <div className="flex items-center gap-1">
                        <Image src={medal} alt="리워드" className="h-6 w-6" />
                        <h2 className="text-gray1000">5,400P</h2>
                        <CircleQuestionMark
                            size={16}
                            className="text-gray600"
                        />
                    </div>
                </div>
                <span className="bg-gray200 flex h-26 w-26 items-center justify-center rounded-[40px]">
                    <Image
                        src={avatar}
                        alt="프로필"
                        className="h-15 w-15 object-fill"
                    />
                </span>
            </div>
        </>
    );
}
