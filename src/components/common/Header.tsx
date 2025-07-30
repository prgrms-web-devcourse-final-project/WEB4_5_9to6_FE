"use client";

import Image from "next/image";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { customAlert } from "@/utils/customAlert";
import { useAlarmStore } from "@/stores/alarmStore";
import { useThemeStore } from "@/stores/themeStore";

export default function Header({
    children,
    notLogin,
    isMyPage,
    className,
}: {
    children?: React.ReactNode;
    notLogin?: boolean;
    isMyPage?: boolean;
    className?: string;
}) {
    const router = useRouter();
    const { myInfo } = useAuthStore();
    const [id, setId] = useState(0);
    const alarms = useAlarmStore((state) => state.alarmList);
    const theme = useThemeStore((state) => state.theme);

    useEffect(() => {
        if (myInfo) {
            setId(myInfo.id);
        }
    }, [myInfo]);

    return (
        <>
            <div className="fixed z-20 h-15.5 w-full">
                <div
                    className={twMerge(
                        "absolute inset-0 h-15.5 w-full bg-[var(--color-gray100)]/60 backdrop-blur-xl dark:bg-[#222222]",
                        className,
                    )}
                ></div>
                <div className="relative flex justify-between text-black dark:text-white">
                    <span>
                        {children ? (
                            <h3 className="absolute top-5 left-5">
                                {children}
                            </h3>
                        ) : (
                            <Link href="/">
                                {theme === "light" ? (
                                    <Image
                                        src="/images/logo-default.png"
                                        alt="logo"
                                        width={82}
                                        height={16}
                                        style={{
                                            marginTop: "23px",
                                            marginLeft: "20px",
                                        }}
                                    />
                                ) : (
                                    <Image
                                        src="/images/logo-dark.png"
                                        alt="logo"
                                        width={82}
                                        height={16}
                                        style={{
                                            marginTop: "23px",
                                            marginLeft: "20px",
                                        }}
                                    />
                                )}
                            </Link>
                        )}
                    </span>
                    {notLogin && (
                        <div className="absolute top-5 right-5 flex items-center gap-3.5">
                            <button
                                onClick={() => router.push("/login")}
                                className="h6 text-main400 hover:text-main500 cursor-pointer transition-colors duration-200"
                            >
                                로그인
                            </button>
                        </div>
                    )}
                    {!notLogin && (
                        <div className="absolute top-5 right-5 flex items-center gap-3.5">
                            <button
                                onClick={() => {
                                    if (id === 0) {
                                        router.push("/");
                                        customAlert({
                                            message:
                                                "잘못된 접근입니다. 로그인 후, 시도해주세요.",
                                        });
                                    } else {
                                        router.push(`/profile/${id}/theme`);
                                    }
                                }}
                                className="h6 text-main400 hover:text-main500 cursor-pointer transition-colors duration-200"
                            >
                                테마변경
                            </button>
                            {isMyPage && (
                                <button
                                    onClick={() => {
                                        if (id === 0) {
                                            router.push("/");
                                        } else {
                                            router.push(`/profile/${id}/info`);
                                        }
                                    }}
                                    className="h6 text-gray1000 dark:text-gray300 cursor-pointer transition-colors duration-200 hover:text-black dark:hover:text-white"
                                >
                                    내 정보 수정
                                </button>
                            )}
                            <div className="relative">
                                <Bell
                                    className="text-gray1000 dark:text-gray300 cursor-pointer transition-colors duration-200 ease-in hover:text-black dark:hover:text-white"
                                    onClick={() =>
                                        router.push("/notifications")
                                    }
                                />
                                {alarms.filter(
                                    (alarm) => alarm.isRead === false,
                                ).length > 0 && (
                                    <>
                                        <div className="absolute top-[-1px] right-0 h-2 w-2 animate-ping rounded-full bg-red-500" />
                                        <div className="absolute top-[-1px] right-0 h-2 w-2 rounded-full bg-red-600" />
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
