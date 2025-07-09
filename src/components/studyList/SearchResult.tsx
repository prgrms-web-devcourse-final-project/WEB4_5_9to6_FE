export default function StudySearch() {
    return (
        <>
            <div className="h-[800px] w-full bg-[var(--color-gray100)] pr-5">
                <div className="mt-[-6px] flex h-6 items-center gap-[8px]">
                    <div className="flex h-full w-auto items-center rounded-3xl bg-[#454545] px-[9px] text-[11px] text-[#FFFFFF]">
                        온라인
                    </div>
                    <div className="flex h-full w-auto items-center rounded-3xl bg-[#454545] px-[9px] text-[11px] text-[#FFFFFF]">
                        활동 전체
                    </div>
                </div>
                <div className="mt-[46px] flex flex-col items-center">
                    <h3 className="text-[var(--color-gray1000)]">
                        `봄코딩`에 대한 검색결과가 없습니다.
                    </h3>
                    <p className="b2 mt-[10px] text-[var(--color-gray700)]">
                        다른 키워드로 스터디를
                    </p>
                    <p className="b2 text-[var(--color-gray700)]">
                        검색해보세요!
                    </p>
                </div>
            </div>
        </>
    );
}
