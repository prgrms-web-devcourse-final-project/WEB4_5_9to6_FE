"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LogSurvival({ study }: { study?: StudyInfo }) {
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        if (study?.start_date) {
            const startDate = new Date(study?.start_date);
            const now = new Date();

            startDate.setHours(0, 0, 0, 0);
            now.setHours(0, 0, 0, 0);

            setOpen(startDate < now);
        }
    }, [study]);

    return (
        <>
            {isOpen ? (
                <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-white px-5 py-10">
                    <h3 className="text-gray1000">생존 중...</h3>

                    <div className="relative mt-5 aspect-[1/1] w-26">
                        <Image
                            src={"/icons/open.png"}
                            alt="오픈"
                            fill
                            sizes="(max-width: 768px) 100vw, 104px"
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            ) : (
                <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-white px-5 py-10">
                    <h4 className="text-gray1000">
                        &ldquo;스터디가 열리기 전이에요!&ldquo;
                    </h4>

                    <div className="relative mt-5 aspect-[1/1] w-26">
                        <Image
                            src={"/icons/notOpen.png"}
                            alt="오픈전"
                            fill
                            sizes="(max-width: 768px) 100vw, 104px"
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            )}
        </>
    );
}
