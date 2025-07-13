"use client";

import Image from "next/image";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

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
    return (
        <>
            <div className="fixed z-20 h-15.5 w-full">
                <div
                    className={twMerge(
                        "absolute inset-0 h-15.5 w-full bg-[var(--color-gray100)]/60 backdrop-blur-xl",
                        className,
                    )}
                ></div>
                <div className="relative flex justify-between">
                    <span>
                        {children ? (
                            <h3 className="absolute top-5 left-5">
                                {children}
                            </h3>
                        ) : (
                            <Link
                                href="/"
                                onClick={() => {
                                    if (typeof window !== "undefined") {
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        });
                                    }
                                }}
                            >
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
                                onClick={() => router.push("/profile/1/theme")}
                                className="h6 text-main400 hover:text-main500 cursor-pointer transition-colors duration-200"
                            >
                                테마변경
                            </button>
                            {isMyPage && (
                                <button
                                    onClick={() =>
                                        router.push("/profile/1/info")
                                    }
                                    className="h6 text-gray1000 cursor-pointer transition-colors duration-200 hover:text-black"
                                >
                                    내 정보 수정
                                </button>
                            )}
                            <Bell className="text-gray1000 cursor-pointer transition-colors duration-200 hover:text-black" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
