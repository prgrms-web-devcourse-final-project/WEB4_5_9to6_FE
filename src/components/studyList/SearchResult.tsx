export default function StudyResult({ search }: { search: string }) {
    return (
        <>
            <div className="w-full bg-[var(--color-gray100)] pr-5 pl-5 dark:bg-[#222222]">
                <div className="mt-10 flex flex-col items-center">
                    <h3 className="text-[var(--color-gray1000)] dark:text-white">
                        `{search}`에 대한 검색결과가 없습니다.
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
