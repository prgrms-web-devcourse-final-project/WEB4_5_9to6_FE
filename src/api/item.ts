import { axiosInstance } from ".";

export const fetchRewardItems = async () => {
    const response = await axiosInstance.get("reward-items");
    return response.data.data;
}; // 리워드 아이템 전체 확인

export const purchaseRewardItems = async (itemId: number) => {
    const response = await axiosInstance.post(
        `reward-items/${itemId}/purchase`,
    );
    return response.data;
}; // 리워드 아이템 구매

export const saveImage = async (imageBlob: Blob, clothes: Clothes) => {
    const formData = new FormData();
    const filenameParts = clothes.clothes.map((item) => {
        const idStr = item.itemId.join("-");
        return `${item.category.toLowerCase()}${idStr}`;
    }); // 조합된 아이템아이디 값 기반으로 파일명 생성

    const filename = filenameParts.join("_") + ".png";

    formData.append(
        "image",
        new File([imageBlob], filename, { type: "image/png" }),
    );

    const json = JSON.stringify(clothes);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("request", blob);

    const response = await axiosInstance.post(
        `reward-items/saveimage`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );
    return response.data.data;
}; // 조합된 아바타 이미지 저장

export const changeOwnItems = async (ownItemId: number) => {
    const response = await axiosInstance.patch(
        `reward-items/own-items/${ownItemId}`,
    );
    return response.data.data;
}; // 소유 아이템 변경

export const fetchOwnItems = async () => {
    const response = await axiosInstance.get("reward-items/own-items");
    return response.data.data;
}; // 내가 소유한 아이템 확인
