"use client";

import { useEffect, useState } from "react";
import StudyRoomComponent from "../content/StudyRoomComponent";

export default function StudyRoomList({ ownData }: { ownData: OwnItems[] }) {
    const [isSelected, setSelected] = useState(11);

    const selectHandler = (id: number) => {
        setSelected(id);
    };

    useEffect(() => {
        const selectedItemId = ownData?.find((v) => v.used)?.itemId;
        setSelected(selectedItemId || 0);
    }, [ownData]);

    return (
        <>
            <div className="mx-5 mb-[90px] flex flex-col gap-6">
                {(ownData || []).map((v, i) => (
                    <StudyRoomComponent
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
