interface RewardItems {
    itemId: number;
    name: string;
    price: number;
    itemtype:
        | "THEME"
        | "BACKGROUND"
        | "FACE"
        | "HAT"
        | "HAIR"
        | "TOP"
        | "BOTTOM";
} // 리워드 아이템 타입 형식

interface OwnItems {
    item_id: number;
    own_item_id: number;
    name: string;
    type: "THEME" | "BACKGROUND" | "FACE" | "HAT" | "HAIR" | "TOP" | "BOTTOM";
    used: boolean;
} // 소유한 아이템 타입 형식
