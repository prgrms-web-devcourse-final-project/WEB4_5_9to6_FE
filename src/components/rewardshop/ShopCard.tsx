"use client";

import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";
import medal from "../../assets/images/medal.png";

export default function ShopCard() {
    return (
        <>
            <div className="flex flex-col p-5">
                <div className="mb-1.5 flex items-center">
                    <Image src={medal} alt="리워드" className="h-4.5 w-4.5" />
                    <h6 className="text-gray1000 mr-1">내 리워드</h6>
                    <CircleQuestionMark size={16} className="text-gray600" />
                </div>
                <p className="text-gray1000 text-[26px] font-bold">5,600P</p>
            </div>
        </>
    );
}
