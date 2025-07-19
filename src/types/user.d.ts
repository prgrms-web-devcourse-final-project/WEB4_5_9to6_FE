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

interface StudyMember {
    studyMemberId: number;
    memberId: number;
    nickName: string;
    profileImage: string | null;
    role: "LEADER" | "MEMBER";
    email: string;
}

interface MemberProfile {
    nickname: string;
    joinedStudyCount: number;
    rewardPoints: number;
    winCount: number;
    userStudies: StudyInfo[];
}

interface MemberInfo {
    email: string;
    nickname: string;
    avatarImage: string | null;
}

interface MemberStudies {
    memberId: number;
    nickname: string;
    studies: StudyInfo[];
}
