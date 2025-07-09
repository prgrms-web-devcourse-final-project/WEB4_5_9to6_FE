"use client";

import Image from "next/image";
import google from "../../../../public/images/google.png";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyInfoList() {
    const router = useRouter();
    return (
        <>
            <div className="border-t-gray200 border-b-gray200 mx-5 flex items-center border-t border-b py-5">
                <p className="b2 text-gray1000">내 계정</p>
                <span className="flex-grow"></span>
                <Image
                    src={google}
                    alt="계정"
                    className="mr-1 h-[14px] w-[14px]"
                />
                <p className="b2 text-gray1000">79gun79@gmail.com</p>
            </div>
            <div className="border-b-gray200 mx-5 flex items-center border-b py-5">
                <p className="b2 text-gray1000">닉네임</p>
                <span className="flex-grow"></span>
                <p
                    onClick={() => router.push("info/name")}
                    className="b2 text-gray1000 cursor-pointer"
                >
                    죽음의고양이
                </p>
                <ChevronRight
                    onClick={() => router.push("info/name")}
                    size={20}
                    className="text-gray500 cursor-pointer"
                />
            </div>
            <div className="border-b-gray200 mx-5 flex items-center border-b py-5">
                <p className="b2 text-gray1000">비밀번호 변경</p>
                <span className="flex-grow"></span>
                <p
                    onClick={() => router.push("info/pwd")}
                    className="b2 text-gray1000 cursor-pointer"
                >
                    변경하기
                </p>
                <ChevronRight
                    onClick={() => router.push("info/pwd")}
                    size={20}
                    className="text-gray500 cursor-pointer"
                />
            </div>
            <div className="flex h-50 items-center justify-center">
                <p className="text-gray1000 b2 underline">로그아웃</p>
            </div>
        </>
    );
}
