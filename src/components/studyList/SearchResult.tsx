import { Dispatch, SetStateAction } from "react";

export default function StudyResult({
    search,
    filter,
    setFilter,
}: {
    search: string;
    filter: string[];
    setFilter: Dispatch<SetStateAction<string[]>>;
}) {
    const removeFilter = (remove: string) => {
        setFilter(filter.filter((prev) => prev !== remove));
    };
    return (
        <>
            <div className="w-full bg-[var(--color-gray100)] pr-5 pl-5">
                <div className="mt-[-6px] flex h-6 items-center gap-[8px]">
                    {filter?.map((fil) => (
                        <div
                            key={fil}
                            className="flex h-full w-auto cursor-pointer items-center rounded-3xl bg-[#454545] px-[9px] text-[11px] text-[#FFFFFF]"
                            onClick={() => removeFilter(fil)}
                        >
                            {fil}
                        </div>
                    ))}
                </div>
                <div className="mt-[46px] flex flex-col items-center">
                    <h3 className="text-[var(--color-gray1000)]">
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
