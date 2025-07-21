interface Goal {
    goalId: number;
    content: string;
    type: string;
}
interface StudyInfo {
    name: string;
    category: string;
    maxMembers: number;
    region: string;
    place?: string;
    schedules: string[];
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    status?: string;
    description?: string;
    externalLink: string;
    studyType: "DEFAULT" | "SURVIVAL";
    goals?: Goal[];
    online: boolean;
    notice?: string;
    currentMemberCount?: number;
}
// "members/{memberId}"의 마이페이지의 userStudies 조회
// "members/{memberId}/studies"의 멤버별 studies 조회

interface CreateStudy {
    name: string;
    category: string;
    maxMembers: number;
    region: string;
    place: string;
    schedules: string[];
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    description: string;
    externalLink: string;
    studyType: string;
    goals: { goalId: number; content: string }[];
    online: boolean;
}
// "studies"의 스터디 생성에서 사용

interface StudySearchParams {
    page: number;
    size: number;
    category: string;
    region: string;
    status: string;
    name: string;
    studyType?: "DEFAULT" | "SURVIVAL";
}
// "studies/search"의 스터디 검색(일반, 서바이벌)에서 사용

interface Study {
    studyId: number;
    title: string;
    category: string;
    currentMemberCount: number;
    maxMemberCount: number;
    schedules: string[];
    startTime: string;
    endTime: string;
    status: "READY" | "ACTIVE";
    createdAt: string;
    start_date: string;
    region: string;
    studyType: "SURVIVAL" | "DEFAULT";
}
// "studies/search"의 검색된 스터디 반환 값에서 사용
// StudyInfo의 startate와 place키가 없음

interface Members {
    studyMemberId: number;
    memberId: number;
    nickName: string;
    profileImage: string;
    role: "MEMBER" | "LEADER";
    email: string;
}
// "studies/search"의 검색된 스터디의 리더 이미지를 찾을 때 사용

interface Goal {
    goalId: number;
    content: string;
    type: "WEEKLY";
}
// "studies/{studyId}"에서 조회되는 스터디의 목표 정보

interface StudyInfos {
    name: string;
    category: string;
    maxMembers: number;
    region: string;
    place: string | null;
    schedules: string[];
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    status: "READY" | "ACTIVE";
    description: string;
    externalLink: string;
    studyType: "DEFAULT" | "SURVIVAL";
    goals: Goal[];
    notice: string;
    currentMemberCount: number;
    online: boolean;
}
// "studies/{studyId}"에서 조회되는 스터디 정보

interface Attendance {
    attendanceId: number;
    attendanceDate: string;
    dayOfWeek: string;
    attend: boolean;
}
// "studies/{studyId}/attendance"에서 조회되는 스터디의 attendances 출석 정보
