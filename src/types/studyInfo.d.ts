// interface StudyList {
//     studyId: number;
//     title: string;
//     category: string;
//     currentMemberCount: number;
//     maxMemberCount: number;
//     schedules: string[];
//     startTime: string;
//     endTime: string;
//     status: "READY" | "ACTIVE";
//     createdAt: string;
//     startDate: string;
//     region: string;
//     studyType: "SURVIVAL" | "DEFAULT";
// }
// studies/search
// 스터디 목록 검색

// interface Members {
//     studyMemberId: number;
//     memberId: number;
//     nickName: string;
//     profileImage: string | null;
//     role: "MEMBER" | "LEADER";
//     email: string;
// }
// interface Goal {
//     goalId: number;
//     content: string;
//     type?: "WEEKLY";
// }
// interface StudyInfos {
//     name: string;
//     category: string;
//     maxMembers: number;
//     region: string;
//     place: string | null;
//     schedules: string[];
//     startTime: string;
//     endTime: string;
//     startDate: string;
//     endDate: string;
//     createdAt: string;
//     status: "READY" | "ACTIVE";
//     description: string;
//     externalLink: string;
//     studyType: "DEFAULT" | "SURVIVAL";
//     goals: Goal[];
//     notice: string;
//     currentMemberCount: number;
//     online: boolean;
// }

// interface studyApplicant {
//     applicantId: number;
//     memberId: number;
//     name: string;
//     state: "WAIT" | "ACCEPT" | "REJECT";
//     introduction: string;
//     avatarImage: string | null;
// }
// studies/{studyId}/applications-list
// 스터디 신청자 목록 조회

// export interface studyAttendance {
//     attendanceId: number;
//     attendanceDate: string;
//     dayOfWeek:
//         | "MONDAY"
//         | "TUESDAY"
//         | "WEDNESDAY"
//         | "THURSDAY"
//         | "FRIDAY"
//         | "SATURDAY"
//         | "SUNDAY";
//     attend: boolean;
// }

// studies/{studyId}/attendance
// 주간 출석 내역 조회(이번 주)

// interface CheckGoal {
//     goalId: number;
//     content: string;
//     achieved: boolean;
// }
// studies/{studyId}/check-goal
// 스터디 목표 달성 여부 조회
