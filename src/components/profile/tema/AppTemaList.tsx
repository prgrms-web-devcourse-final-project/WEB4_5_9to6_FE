"use client";

import { useState } from "react";
import AppTemaComponent from "./AppTemaComponent";
import Button from "@/components/common/Button";

export default function AppTemaList() {
    const [isSelected, setSelected] = useState("기본");

    const selectHandler = (name: string) => {
        setSelected(name);
    };
    return (
        <>
            <div className="flex h-[calc(100vh-80px)] flex-col">
                <div className="grid grid-cols-2 gap-6 px-5 py-6">
                    {[
                        "기본",
                        "그린 & 블랙",
                        "블루 & 블랙",
                        "오렌지 & 블랙",
                    ].map((v) => (
                        <AppTemaComponent
                            key={v}
                            name={v}
                            selected={isSelected === v}
                            onSelect={() => selectHandler(v)}
                        />
                    ))}
                </div>
                <div className="mt-auto px-5 pb-6">
                    <Button>적용하기</Button>
                </div>
            </div>
        </>
    );
}
