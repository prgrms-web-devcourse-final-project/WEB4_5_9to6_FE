"use client";

import { useState } from "react";
import MyInfoCard from "./MyInfoCard";
import MyInfoList from "./MyInfoList";

export default function MyInfo({ id }: { id: string }) {
    const [isLogOut, setIsLogOut] = useState(false);

    return (
        <>
            {isLogOut ? (
                <>
                    <div className="flex animate-pulse flex-col items-center justify-center gap-5 pt-4 pb-12">
                        <div className="bg-gray200 relative flex h-26 w-26 items-center justify-center rounded-[40px]"></div>
                        <div className="bg-gray200 h-6 w-26 rounded-2xl font-bold"></div>
                    </div>
                    <div className="border-t-gray200 mx-5 flex items-center justify-center border-t py-5">
                        <p>로그아웃 중..</p>
                    </div>
                </>
            ) : (
                <>
                    <MyInfoCard id={id} />
                    <MyInfoList setIsLogOut={setIsLogOut} />
                </>
            )}
        </>
    );
}
