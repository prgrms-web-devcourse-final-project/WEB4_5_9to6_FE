"use client";

import { useState } from "react";
import ShopRoomComponent from "../content/ShopRoomComponent";

export default function ShopRoomList() {
    const [isSelected, setSelected] = useState("천상정원");

    const selectHandler = (name: string) => {
        setSelected(name);
    };
    return (
        <>
            <div className="mx-5 mb-[90px] flex flex-col gap-6">
                {[
                    "기본",
                    "천상정원",
                    "스페이스 엣지",
                    "도쿄 뒷골목",
                    "사이버 시티",
                    "야타이 거리",
                    "프린세스 룸",
                    "공포 서커스",
                    "피의 격납고",
                ].map((v, i) => (
                    <ShopRoomComponent
                        key={v}
                        name={v}
                        index={i}
                        selected={isSelected === v}
                        onSelect={() => selectHandler(v)}
                    />
                ))}
            </div>
        </>
    );
}
