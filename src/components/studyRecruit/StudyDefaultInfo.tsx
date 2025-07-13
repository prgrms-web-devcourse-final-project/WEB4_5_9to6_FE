export default function StudyDefaultInfo() {
    return (
        <>
            {/* <div className="w-full px-5">
                <h3 className="mt-6 text-[var(--color-gray1000)]">기본정보</h3> */}
            <div className="mt-6 w-full">
                <div className="flex justify-between text-[var(--color-gray1000)]">
                    <h6>팀원</h6>
                    <h6>최대 6명</h6>
                </div>

                <div className="mt-4 flex justify-between text-[var(--color-gray1000)]">
                    <h6>스터디 요일</h6>
                    <h6>매주 월, 수 ,금</h6>
                </div>

                <div className="mt-4 flex justify-between text-[var(--color-gray1000)]">
                    <h6>스터디 시간</h6>
                    <h6>18:00~20:00</h6>
                </div>

                <div className="mt-4 flex justify-between text-[var(--color-gray1000)]">
                    <h6>기간</h6>
                    <h6>2025.03~2025.05 (3개월)</h6>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}
