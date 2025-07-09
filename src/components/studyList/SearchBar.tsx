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
            <div className="flex h-11 w-[320px] items-center justify-between rounded-[12px] bg-[var(--color-gray200)] px-3 hover:bg-[var(--color-gray300)]">
                <div className="flex items-center gap-[6px]">
                    <Search className="h-[18px] w-[18px] text-[var(--color-gray700)]" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="관심있는 스터디를 검색해보세요!"
                        className="b2 text-[var(--color-gray600)] outline-none"
                    />
                </div>
                <button onClick={() => setIsModalOpen(true)}>
                    <ListFilter className="h-5 w-5 cursor-pointer text-[var(--color-gray700)]" />
                </button>
            </div>
        </>
    );
}
