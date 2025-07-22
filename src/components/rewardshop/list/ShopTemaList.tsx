"use client";

import { useState } from "react";
import ShopTemaComponent from "../content/ShopTemaComponent";

export default function ShopTemaList() {
    const [isSelected, setSelected] = useState("기본");

    const selectHandler = (name: string) => {
        setSelected(name);
    };
    return (
        <>
            <div className="mx-5 mb-[90px] grid grid-cols-2 gap-6">
                {[
                    "기본",
                    "블랙",
                    "그린",
                    "그린 & 블랙",
                    "블루 & 블랙",
                    "오렌지 & 블랙",
                ].map((v) => (
                    <ShopTemaComponent
                        key={v}
                        name={v}
                        selected={isSelected === v}
                        onSelect={() => selectHandler(v)}
                    />
                ))}
            </div>
        </>
    );
}
