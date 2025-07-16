export const translateRegionToEnum = (region: string) => {
    switch (region) {
        case "서울":
            return "SEOUL";
        case "경기":
            return "GYEONGGI";
        case "인천":
            return "INCHEON";
        case "강원":
            return "GANGWON";
        case "대구":
            return "DAEGU";
        case "대전":
            return "DAEJEON";
        case "울산":
            return "ULSAN";
        case "부산":
            return "BUSAN";
        case "광주":
            return "GWANGJU";
        case "세종":
            return "SEJONG";
        case "충남":
            return "CHUNGNAM";
        case "충북":
            return "CHUNGBUK";
        case "전남":
            return "JEONNAM";
        case "전북":
            return "JEONBUK";
        case "경남":
            return "GYEONGNAM";
        case "경북":
            return "GYEONGBUK";
        case "제주":
            return "JEJU";
        default:
            return "";
    }
};
