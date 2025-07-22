"use client";

import ShopTemaComponent from "../content/ShopTemaComponent";

export default function ShopTemaList({
    data,
    ownData,
}: {
    data: RewardItems[];
    ownData: OwnItems[];
}) {
    const selectedItemId = ownData?.find((v) => v.used)?.item_id;
    const ownedItemIds = new Set(ownData?.map((v) => v.item_id));

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
                            selected={v.itemId === selectedItemId}
                        />
                    ))}
            </div>
        </>
    );
}
