interface Avatar {
    avatarImage: string | null;
    itemIds: number[];
}

interface User {
    id: number;
    email: string;
    nickname: string;
    birthday: string;
    gender: string;
    rewardPoints: number;
    winCount: number;
    socialType: string;
    role: string;
    avatarInfo: Avatar;
}

interface AuthStore {
    isLogIn: boolean;
    myInfo: User | null;
    refetch: () => Promise<void>;
    login: (token: string) => void;
    logout: () => void;
}
