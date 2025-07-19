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

const dayMap: Record<string, string> = {
    MON: "월요일",
    TUE: "화요일",
    WED: "수요일",
    THU: "목요일",
    FRI: "금요일",
    SAT: "토요일",
    SUN: "일요일",
};
const categoryMap: Record<string, string> = {
    LANGUAGE: "어학",
    JOB: "취업",
    PROGRAMMING: "프로그래밍",
    EXAM_PUBLIC: "고시&공무원",
    EXAM_SCHOOL: "수능&내신",
    ETC: "기타",
};
const regionMap: Record<string, string> = {
    ONLINE: "온라인",
    SEOUL: "서울",
    GYEONGGI: "경기",
    GANGWON: "강원",
    INCHEON: "인천",
    BUSAN: "부산",
    ULSAN: "울산",
    DAEGU: "대구",
    DAEJEON: "대전",
    GWANGJU: "광주",
    SEJONG: "세종",
    CHUNGNAM: "충남",
    CHUNGBUK: "충북",
    JEONNAM: "전남",
    JEONBUK: "전북",
    GYEONGNAM: "경남",
    GYEONGBUK: "경북",
    JEJU: "제주",
};
