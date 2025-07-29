"use client";

import { useState } from "react";
import MyInfoCard from "./MyInfoCard";
import MyInfoList from "./MyInfoList";
import MyInfoLoading from "./MyInfoLoading";

export default function MyInfo({ id }: { id: string }) {
    const [isLogOut, setIsLogOut] = useState(false);

    return (
        <>
            {isLogOut ? (
                <>
                    <MyInfoLoading />
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
