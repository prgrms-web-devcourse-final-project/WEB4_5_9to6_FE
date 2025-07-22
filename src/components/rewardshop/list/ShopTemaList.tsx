"use client";

import { useState } from "react";
import ShopTemaComponent from "../content/ShopTemaComponent";

export default function ShopTemaList({
    data,
    ownData,
}: {
    data: rewardItems[];
    ownData: ownItems[];
}) {
    const [isSelected, setSelected] = useState(1);
    const ownedItemIds = new Set(ownData?.map((v) => v.item_id));

    const selectHandler = (id: number) => {
        setSelected(id);
    };

    return (
        <>
            <div className="mx-5 mb-[90px] grid grid-cols-2 gap-6">
                {(data || [])
                    .filter((v) => v.name !== "빈 테마")
                    .map((v, i) => (
                        <ShopTemaComponent
                            key={i}
                            id={v.itemId}
                            name={v.name}
                            price={v.price}
                            owned={ownedItemIds.has(v.itemId)}
                            selected={isSelected === v.itemId}
                            onSelect={() => selectHandler(v.itemId)}
                        />
                    ))}
            </div>
        </>
    );
}
