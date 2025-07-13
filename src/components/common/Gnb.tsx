"use client";
import { House, Store, ClipboardList, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Gnb() {
    const pathname = usePathname();
    return (
        <>
            <div className="fixed bottom-0 z-50 h-18 w-full rounded-2xl bg-white">
                <div className="mx-10 flex justify-between pt-3.5">
                    <Link
                        href="/"
                        className={`flex cursor-pointer flex-col items-center transition duration-200 ease-in-out hover:text-[var(--color-gray1000)] ${
                            pathname === "/"
                                ? "text-[var(--color-gray1000)]"
                                : "text-[var(--color-gray500)]"
                        }`}
                    >
                        <House className={`mb-1 justify-center`} />
                        <p className="c2">홈</p>
                    </Link>
                    <Link
                        href="/studylist"
                        className={`flex cursor-pointer flex-col items-center transition duration-200 ease-in-out hover:text-[var(--color-gray1000)] ${
                            pathname === "/studylist"
                                ? "text-[var(--color-gray1000)]"
                                : "text-[var(--color-gray500)]"
                        }`}
                    >
                        <ClipboardList className="mb-1 justify-center" />
                        <p className="c2">스터디 목록</p>
                    </Link>
                    <Link
                        href="/rewardshop"
                        className={`flex cursor-pointer flex-col items-center transition duration-200 ease-in-out hover:text-[var(--color-gray1000)] ${
                            pathname.startsWith("/rewardshop")
                                ? "text-[var(--color-gray1000)]"
                                : "text-[var(--color-gray500)]"
                        }`}
                    >
                        <Store className="] mb-1 justify-center" />
                        <p className="c2">리워드 상점</p>
                    </Link>
                    <Link
                        href="/profile"
                        className={`flex cursor-pointer flex-col items-center transition duration-200 ease-in-out hover:text-[var(--color-gray1000)] ${
                            pathname.startsWith("/profile")
                                ? "text-[var(--color-gray1000)]"
                                : "text-[var(--color-gray500)]"
                        }`}
                    >
                        <UserRound className="mb-1 justify-center" />
                        <p className="c2">마이페이지</p>
                    </Link>
                </div>
            </div>
        </>
    );
}
