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
    userStudies: StudyInfo[];
}
// "members/{memberId}"의 마이페이지 정보 조회

interface MemberInfoType {
    email: string;
    nickname: string;
    avatarImage: string | null;
}
// "members/{memberId}/info"의 간단한 회원 정보

interface MemberStudies {
    memberId: number;
    nickname: string;
    studies: StudyInfo[];
}
// "members/{memberId}/studies"의 가입한 스터디 목록 조회
