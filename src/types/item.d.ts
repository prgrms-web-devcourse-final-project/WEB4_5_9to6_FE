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
    itemId: number;
    ownItemId: number;
    name: string;
    type: "THEME" | "BACKGROUND" | "FACE" | "HAT" | "HAIR" | "TOP" | "BOTTOM";
    used: boolean;
} // 소유한 아이템 타입 형식

interface Clothes {
    clothes: {
        name: string;
        category:
            | "THEME"
            | "BACKGROUND"
            | "FACE"
            | "HAT"
            | "HAIR"
            | "TOP"
            | "BOTTOM";
        itemId: number[];
    }[];
}

// 아바타 이미지 저장 타입 형식
