"use client";

import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import NoticeBox from "@/components/common/NoticeBox";
import SurvivalInfo from "@/components/survival/SurvivalInfo";
import WinnerModal from "@/components/survival/WinnerModal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SurvivalStudy() {
    const router = useRouter();

    const QuizStartHandler = () => {
        router.push("/survival-study/1/quiz/1");
    };
    return (
        <>
            <div className="h-screen">
                <div className="relative">
                    <Image
                        src="/images/roomImgs/room7.png"
                        alt="survival study"
                        width={1000}
                        height={470}
                        style={{
                            width: "100%",
                            maxHeight: "500px",
                        }}
                    />
                    <div className="absolute top-4 left-4">
                        <BackButton className="h-4 w-4" />
                    </div>
                    <button className="absolute right-4 bottom-4 h-6.5 w-14.5 rounded-3xl bg-[#1d1d1d]/80">
                        <Link href="/profile/123/theme">
                            <p className="c2 px-2 pt-0.5 text-white">
                                테마변경
                            </p>
                        </Link>
                    </button>
                </div>

                <NoticeBox
                    content="다음 퀴즈는 7/17 열시에 열릴 예정입니다."
                    className="rounded-none bg-[var(--color-gray100)]/85"
                    date="07.11"
                />
                <SurvivalInfo />
                <div className="flex h-22.5 w-full items-center justify-center border-t-1 border-t-[var(--color-gray200)]">
                    <Button
                        onClick={QuizStartHandler}
                        className="mx-5 my-5 bg-[var(--color-main500)] transition duration-200 hover:bg-[var(--color-main600)]"
                    >
                        <Image
                            src="/icons/flash.svg"
                            alt="survival icon"
                            width={14}
                            height={14}
                            style={{ marginBottom: "1px" }}
                        />
                        퀴즈 시작
                    </Button>
                </div>
            </div>
            <WinnerModal />
        </>
    );
}
