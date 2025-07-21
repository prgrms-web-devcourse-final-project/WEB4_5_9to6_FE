interface StudyInfo {
    studyId: number;
    title: string;
    currentMemberCount: number;
    maxMemberCount: number;
    category: string;
    region: string;
    place: string | null;
    start_date: string;
    end_date: string;
    schedules: string[];
    startTime: string;
    endTime: string;
    studyType: "DEFAULT" | "SURVIVAL";
}
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

// 스터디 목록 관련
interface StudySearchParams {
    page: number;
    size: number;
    category: string;
    region: string;
    status: string;
    name: string;
    studyType?: "DEFAULT" | "SURVIVAL";
}
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
    startDate: string;
    region: string;
    studyType: "SURVIVAL" | "DEFAULT";
}
interface Members {
    studyMemberId: number;
    memberId: number;
    nickName: string;
    profileImage: string;
    role: "MEMBER" | "LEADER";
    email: string;
}
interface Goal {
    goalId: number;
    content: string;
    type: "WEEKLY";
}
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

interface Attendance {
    attendanceId: number;
    attendanceDate: string;
    dayOfWeek: string;
    attend: boolean;
}
