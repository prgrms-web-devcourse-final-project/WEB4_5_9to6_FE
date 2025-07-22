"use client";

import { useState } from "react";
import ShopRoomComponent from "../content/ShopRoomComponent";

export default function ShopRoomList({
    data,
    ownData,
}: {
    data: rewardItems[];
    ownData: ownItems[];
}) {
    const [isSelected, setSelected] = useState(11);
    const ownedItemIds = new Set(ownData?.map((v) => v.item_id));

    const selectHandler = (id: number) => {
        setSelected(id);
    };

    return (
        <>
            <div className="mx-5 mb-[90px] flex flex-col gap-6">
                {(data || [])
                    .filter((v) => v.name !== "빈 배경")
                    .map((v, i) => (
                        <ShopRoomComponent
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
