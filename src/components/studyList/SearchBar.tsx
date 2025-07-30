"use client";
import { ListFilter, Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function SearchBar({
    setIsModalOpen,
    search,
    setSearch,
}: {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
}) {
    return (
        <>
            <div className="dark:bg-gray1000 dark:hover:bg-gray900 mt-[1px] flex h-11 w-full items-center justify-between rounded-[12px] bg-[var(--color-gray200)] px-3 transition-all duration-200 ease-in-out hover:bg-[var(--color-gray300)]">
                <div className="flex items-center gap-[6px]">
                    <Search className="dark:text-gray600 h-[18px] w-[18px] text-[var(--color-gray700)]" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="관심있는 스터디를 검색해보세요!"
                        className="b2 dark:text-gray500 text-[var(--color-gray600)] outline-none"
                    />
                </div>
                <button onClick={() => setIsModalOpen(true)}>
                    <ListFilter className="dark:text-gray600 h-5 w-5 cursor-pointer text-[var(--color-gray700)]" />
                </button>
            </div>
        </>
    );
}
