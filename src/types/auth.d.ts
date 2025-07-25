interface Avatar {
    avatarImage: string | null;
    itemIds: number[];
} // "member/info-all"에서 사용하는 avatarInfo 타입

interface User {
    id: number;
    birthday: string;
    email: string;
    gender: "MALE" | "FEMALE";
    nickname: string;
    rewardPoints: number;
    role: "ROLE_USER" | "ADMIN";
    socialType: "LOCAL" | "GOOGLE" | "KAKAO";
    winCount: number;
    avatarInfo: Avatar;
} // "/members/info-all"에서 사용하는 멤버(memberInfo + avatarInfo) 타입

interface AuthStore {
    isLogIn: boolean;
    myInfo: User | null;
    isFetched: boolean;
    refetch: () => Promise<void>;
    login: () => void;
    logout: () => void;
} // 내 로그인 정보를 저장하기 위한 타입
