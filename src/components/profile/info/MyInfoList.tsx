"use client";

import Image from "next/image";
import google from "../../../../public/images/google.png";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import { customAlert } from "@/utils/customAlert";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";

export default function MyInfoList({ data }: { data: MemberInfo }) {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<MemberInfo | null>(null);

    const { mutate: logoutMutate } = useMutation({
        mutationFn: logout,
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
        },
    });

    useEffect(() => {
        const getProfile = async () => {
            try {
                setUserInfo(data);
            } catch (e) {
                console.error(e);
            }
        };
        getProfile();
    }, [data]);

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
                <p className="b2 text-gray1000">{userInfo?.email}</p>
            </div>
            <div className="border-b-gray200 mx-5 flex items-center border-b py-5">
                <p className="b2 text-gray1000">닉네임</p>
                <span className="flex-grow"></span>
                <p
                    onClick={() => router.push("info/name")}
                    className="b2 text-gray1000 cursor-pointer"
                >
                    {userInfo?.nickname}
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
            <div className="relative h-[300px]">
                <button
                    onClick={() => logoutMutate()}
                    className="text-gray1000 b2 absolute top-23.5 left-1/2 -translate-x-1/2 cursor-pointer underline"
                >
                    로그아웃
                </button>
            </div>
        </>
    );
}
