"use client";

import Image from "next/image";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Header() {
    const router = useRouter();
    return (
        <>
            <div className="fixed z-20 h-15.5 w-full">
                <div className="absolute inset-0 h-15.5 w-full bg-[var(--color-gray100)]/60 backdrop-blur-xl"></div>
                <div className="relative flex justify-between">
                    <h1>
                        <Link
                            href="/"
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
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
                    </h1>
                    <div className="mt-5 mr-5 flex items-center gap-3.5">
                        <button
                            onClick={() => router.push("/profile/1/theme")}
                            className="h6 cursor-pointer text-[var(--color-main400)]"
                        >
                            테마변경
                        </button>
                        <Bell className="cursor-pointer text-[var(--color-gray1000)]" />
                    </div>
                </div>
            </div>
        </>
    );
}
