"use client";

import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import Image from "next/image";
import { useState } from "react";

export default function ResultPage() {
    const [rotate, setRotate] = useState(false);

    return (
        <>
            <div className="relative">
                <div className="mx-5 flex flex-col">
                    <header className="flex h-15.5 w-full items-center">
                        <BackButton className="h-6 w-6" />
                    </header>
                    <div className="text-center">
                        <h5 className="h5 mb-3 text-[var(--color-main400)]">
                            서바이벌 Quiz
                        </h5>
                        <h1 className="h1 mb-9.5">결과</h1>
                        <hr className="text-[var(--color-gray200)]" />
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                        <h3 className="h3 mb-10">
                            총 5문제 중 3문제를 맞췄어요!
                        </h3>
                        <div className="-rotate-10 transition-transform duration-200 ease-linear hover:-rotate-5">
                            <Image
                                src="/icons/thumb-up.svg"
                                alt="thumbup"
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-0 flex h-22.5 w-full items-center justify-center border-t-1 border-t-[var(--color-gray200)]">
                    <Button className="mx-5 my-5 bg-[var(--color-main500)] transition duration-200 hover:bg-[var(--color-main600)]">
                        스터디 홀으로
                    </Button>
                </div>
            </div>
        </>
    );
}
