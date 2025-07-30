"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LogSurvival({ study }: { study?: MemberStudyList }) {
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
                <div className="dark:bg-gray1000 flex w-full flex-col items-center justify-center rounded-2xl bg-white px-5 py-10">
                    <h3 className="text-gray1000 dark:text-white">
                        생존 중...
                    </h3>

                    <div className="relative mt-5 h-[104px] w-[104px]">
                        <Image
                            src="/icons/open.png"
                            alt="오픈"
                            fill
                            className="object-contain"
                            sizes="104px"
                        />
                    </div>
                </div>
            ) : (
                <div className="dark:bg-gray1000 flex w-full flex-col items-center justify-center rounded-2xl bg-white px-5 py-10">
                    <h4 className="text-gray1000 dark:text-white">
                        &ldquo;스터디가 열리기 전이에요!&ldquo;
                    </h4>

                    <div className="relative mt-5 h-[104px] w-[104px]">
                        <Image
                            src="/icons/notOpen.png"
                            alt="오픈전"
                            fill
                            className="object-contain"
                            sizes="104px"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
