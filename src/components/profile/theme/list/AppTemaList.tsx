"use client";

import { useEffect, useState } from "react";
import AppTemaComponent from "../content/AppTemaComponent";

export default function AppTemaList({ ownData }: { ownData: OwnItems[] }) {
    const [isSelected, setSelected] = useState(1);

    const selectHandler = (id: number) => {
        setSelected(id);
    };

    useEffect(() => {
        const selectedItemId = ownData?.find((v) => v.used)?.itemId;
        setSelected(selectedItemId || 0);
    }, [ownData]);

    return (
        <>
            <div className="mx-5 mb-[90px] grid grid-cols-2 gap-6">
                {(ownData || []).map((v, i) => (
                    <AppTemaComponent
                        key={i}
                        id={v.itemId}
                        ownId={v.ownItemId}
                        name={v.name}
                        selected={isSelected === v.itemId}
                        onSelect={() => selectHandler(v.itemId)}
                    />
                ))}
            </div>
        </>
    );
}
