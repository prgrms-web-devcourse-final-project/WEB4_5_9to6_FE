export const getValidAvatar = (avatar?: string | null) =>
    !avatar || avatar.includes("placehold.co")
        ? "/images/rewardItems/61.png"
        : avatar;
export const dayMap: Record<string, string> = {
    MON: "월",
    TUE: "화",
    WED: "수",
    THU: "목",
    FRI: "금",
    SAT: "토",
    SUN: "일",
};
export const categoryMap: Record<string, string> = {
    LANGUAGE: "어학",
    JOB: "취업",
    PROGRAMMING: "프로그래밍",
    EXAM_PUBLIC: "고시&공무원",
    EXAM_SCHOOL: "수능&내신",
    ETC: "기타",
};
export const regionMap: Record<string, string> = {
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

export const scheduleString = (sche: string[]) => {
    const day: Record<string, string> = {
        MON: "월",
        TUE: "화",
        WED: "수",
        THU: "목",
        FRI: "금",
        SAT: "토",
        SUN: "일",
    };
    const order = Object.keys(day);
    return sche
        .sort((a, b) => order.indexOf(a) - order.indexOf(b))
        .map((d) => day[d])
        .join(", ");
};
