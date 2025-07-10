"use client";

import { useState } from "react";
import AppTemaComponent from "../content/AppTemaComponent";

export default function AppTemaList() {
    const [isSelected, setSelected] = useState("기본");

    const selectHandler = (name: string) => {
        setSelected(name);
    };
    return (
        <>
            <div className="mx-5 mb-[90px] grid grid-cols-2 gap-6">
                {["기본", "그린 & 블랙", "블루 & 블랙", "오렌지 & 블랙"].map(
                    (v) => (
                        <AppTemaComponent
                            key={v}
                            name={v}
                            selected={isSelected === v}
                            onSelect={() => selectHandler(v)}
                        />
                    ),
                )}
            </div>
        </>
    );
}
