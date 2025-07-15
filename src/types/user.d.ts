interface MemberInfo {
    birthday: string;
    email: string;
    gender: "MALE" | "FEMALE";
    id: number;
    nickname: string;
    rewardPoints: number;
    role: "ROLE_USER" | "ADMIN";
    socialType: "LOCAL" | "GOOGLE" | "KAKAO";
    winCount: number;
}
interface AvatarInfo {
    avatarImage: string | null;
    itemIds: number[];
}

interface UserAllInfo {
    memberInfo: MemberInfo;
    avatarInfo: AvatarInfo;
}
