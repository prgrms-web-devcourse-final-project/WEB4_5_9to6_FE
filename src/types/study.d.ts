interface Goal {
    goalId: number | null;
    content: string;
    type: string;
}
interface Attendance {
    attendanceId: number;
    attendanceDate: string;
    dayOfWeek: string;
    attend: boolean;
}
interface GoalWeekCount {
    week: string;
    count: number;
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
// "studies/{studyId}"에서 조회되는 스터디 상세 정보

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
    goals: { goalId: number | null; content: string }[];
    isOnline: boolean;
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
//?

interface StudyList {
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
    startDate: string;
    region: string;
    studyType: "SURVIVAL" | "DEFAULT";
}
// "studies/search"에서 검색된 스터디 목록

interface Members {
    studyMemberId: number;
    memberId: number;
    nickname: string;
    profileImage: string;
    role: "MEMBER" | "LEADER";
    email: string;
}
// "studies/{studyId}/members"에서 조회된 스터디 멤버 목록
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
    online: boolean | null;
}
// "studies/{studyId}"에서 조회되는 스터디 정보

interface studyApplicant {
    applicantId: number;
    memberId: number;
    name: string;
    state: "WAIT" | "ACCEPT" | "REJECT";
    introduction: string;
    avatarImage: string | null;
}
// "studies/{studyId}/applications-list"에서 조회되는 스터디 신청자 목록

interface CheckGoal {
    goalId: number;
    content: string;
    achieved: boolean;
}
// "studies/{studyId}/check-goal"에서 조회되는 스터디 목표 달성 여부

interface studyUserAttendance {
    studyMemberId: number;
    attendances: Attendance[];
}
// "studies/{studyId}/attendance"에서 조회되는 스터디의 attendances 출석 정보

interface studyUserGoals {
    studyId: number;
    goals: GoalWeekCount[];
}
// "studies/{studyId}/goals/completed"에서 조회되는 스터디의 월간 목표 달성 개수
