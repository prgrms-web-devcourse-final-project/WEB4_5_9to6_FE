export const translateCategoryToEnum = (category: string) => {
    switch (category) {
        case "어학":
            return "LANGUAGE";
        case "취업":
            return "JOB";
        case "고시&공무원":
            return "EXAM_PUBLIC";
        case "프로그래밍&IT":
            return "PROGRAMMING";
        case "수능&내신":
            return "EXAM_SCHOOL";
        case "기타":
            return "ETC";
        default:
            return "";
    }
};
