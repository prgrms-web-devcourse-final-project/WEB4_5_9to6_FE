interface rewardItems {
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
}

interface ownItems {
    item_id: number;
    own_item_id: number;
    name: string;
    type: "THEME" | "BACKGROUND" | "FACE" | "HAT" | "HAIR" | "TOP" | "BOTTOM";
    _used: boolean;
}
