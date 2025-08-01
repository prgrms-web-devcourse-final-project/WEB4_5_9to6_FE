"use client";

import Image from "next/image";
import google from "../../../../public/images/google.png";
import kakaotalk from "../../../../public/images/kakaotalk.png";
import logo from "../../../../public/images/signup.png";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import { customAlert } from "@/utils/customAlert";
import { useAuthStore } from "@/stores/authStore";

export default function MyInfoList({
    setIsLogOut,
}: {
    setIsLogOut: (state: boolean) => void;
}) {
    const router = useRouter();
    const { myInfo } = useAuthStore();

    const { mutate: logoutMutate } = useMutation({
        mutationFn: logout,
        onMutate() {
            setIsLogOut(true);
        },
        onSuccess() {
            useAuthStore.getState().logout();
            router.push("/login");
            customAlert({
                message: "로그아웃 되었습니다!",
                linkLabel: "닫기",
                onClick: () => {},
            });
        },
        onError(error) {
            console.error("로그아웃 실패:", error);
            setIsLogOut(false);
        },
    });

    if (!myInfo) {
        return (
            <>
                <div className="border-t-gray200 dark:border-t-gray700 dark:border-b-gray700 border-b-gray200 mx-5 flex animate-pulse items-center border-t border-b py-5">
                    <div className="bg-gray200 dark:bg-gray700 h-4 w-full rounded" />
                </div>

                <div className="border-b-gray200 dark:border-b-gray700 mx-5 flex animate-pulse items-center border-b py-5">
                    <div className="bg-gray200 dark:bg-gray700 h-4 w-full rounded" />
                </div>

                <div className="border-b-gray200 dark:border-b-gray700 mx-5 flex animate-pulse items-center border-b py-5">
                    <div className="bg-gray200 dark:bg-gray700 h-4 w-full rounded" />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="border-t-gray200 dark:border-t-gray800 border-b-gray200 dark:border-b-gray800 mx-5 flex items-center border-t border-b py-5">
                <p className="b2 text-gray1000 dark:text-white">내 계정</p>
                <span className="flex-grow"></span>
                {myInfo?.socialType === "GOOGLE" && (
                    <Image
                        src={google}
                        alt="계정"
                        className="mr-1 h-[14px] w-[14px]"
                    />
                )}
                {myInfo?.socialType === "KAKAO" && (
                    <Image
                        src={kakaotalk}
                        alt="계정"
                        className="mr-1 h-[14px] w-[14px]"
                    />
                )}
                {myInfo?.socialType === "LOCAL" && (
                    <Image
                        src={logo}
                        alt="계정"
                        className="mr-1 h-[24px] w-[24px]"
                    />
                )}
                <p className="b2 text-gray1000 dark:text-white">
                    {myInfo?.email}
                </p>
            </div>
            <div className="border-b-gray200 dark:border-b-gray800 mx-5 flex items-center border-b py-5">
                <p className="b2 text-gray1000 dark:text-white">닉네임</p>
                <span className="flex-grow"></span>
                <p
                    onClick={() => router.push("info/name")}
                    className="b2 text-gray1000 cursor-pointer dark:text-white"
                >
                    {myInfo?.nickname}
                </p>
                <ChevronRight
                    onClick={() => router.push("info/name")}
                    size={20}
                    className="text-gray500 dark:text-gray700 cursor-pointer"
                />
            </div>
            <div className="border-b-gray200 dark:border-b-gray800 mx-5 flex items-center border-b py-5">
                <p className="b2 text-gray1000 dark:text-white">
                    비밀번호 변경
                </p>
                <span className="flex-grow"></span>
                <p
                    onClick={() => router.push("info/pwd")}
                    className="b2 text-gray1000 cursor-pointer dark:text-white"
                >
                    변경하기
                </p>
                <ChevronRight
                    onClick={() => router.push("info/pwd")}
                    size={20}
                    className="text-gray500 dark:text-gray700 cursor-pointer"
                />
            </div>
            <div className="bg-gray100 relative h-[300px] dark:bg-[#222222]">
                <button
                    onClick={() => logoutMutate()}
                    className="text-gray1000 b2 absolute top-23.5 left-1/2 -translate-x-1/2 cursor-pointer underline dark:text-white"
                >
                    로그아웃
                </button>
            </div>
        </>
    );
}
