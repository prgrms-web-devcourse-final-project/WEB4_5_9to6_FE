"use client";

import ShopRoomComponent from "../content/ShopRoomComponent";

export default function ShopRoomList({
    data,
    ownData,
}: {
    data: RewardItems[];
    ownData: OwnItems[];
}) {
    const selectedItemId = ownData?.find((v) => v.used)?.itemId;
    const ownedItemIds = new Set(ownData?.map((v) => v.itemId));

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
                            selected={v.itemId === selectedItemId}
                        />
                    ))}
            </div>
        </>
    );
}
