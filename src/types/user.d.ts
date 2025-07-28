interface StudyMember {
    studyMemberId: number;
    memberId: number;
    nickName: string;
    profileImage: string | null;
    role: "LEADER" | "MEMBER";
    email: string;
}
// "studies/{id}/members"의 스터디 멤버목록 조회

interface MemberProfile {
    nickname: string;
    joinedStudyCount: number;
    rewardPoints: number;
    winCount: number;
    userStudies: MemberStudyInfo[];
}
// "members/{memberId}"의 마이페이지 정보 조회

interface MemberStudyInfo {
    title: string;
    currentMemberCount: number;
    maxMemberCount: number;
    category: string;
    region: string;
    place: null;
    startTime: string;
    endTime: string;
    schedules: string[];
    startTime: string;
    endTime: string;
    studyType: "DEFAULT" | "SURVIVAL";
    achievementRecords: {
        achievedAt: string;
        accomplished: boolean;
    }[];
}

interface MemberInfoType {
    email: string;
    nickname: string;
    avatarImage: string | null;
}
// "members/{memberId}/info"의 간단한 회원 정보

interface MemberStudies {
    memberId: number;
    nickname: string;
    studies: MemberStudyList[];
}
// "members/{memberId}/studies"의 가입한 스터디 목록 조회

interface MemberStudyList {
    studyId: number;
    title: string;
    currentMemberCount: number;
    maxMemberCount: number;
    category: string;
    region: string;
    place: null;
    start_date: string;
    end_date: string;
    schedules: string[];
    startTime: string;
    endTime: string;
    studyType: "DEFAULT" | "SURVIVAL";
}
