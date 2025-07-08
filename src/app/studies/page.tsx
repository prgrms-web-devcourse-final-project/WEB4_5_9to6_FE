"use client";

import { ListFilter, Plus, Search } from "lucide-react";
import { useState } from "react";
import FilterModal from "@/components/studyList/FilterModal";
import StudyLists from "@/components/studyList/StudyLists";
import StudySearch from "@/components/studyList/StudySearch";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState("전체");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<string[]>([]);
    const channels = [
        "전체",
        "어학",
        "취업",
        "프로그래밍",
        "고시&공무원",
        "수능&내신",
        "기타",
    ];

    const channelHandler = (channel: string) => {
        setSelected(channel);
    };
    const searchHandler = (filters: string[]) => {
        setFilter(filters);
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="w-[360px] bg-[var(--color-gray100)] pt-[19px] pl-5 hover:bg-[var(--color-gray300)]">
                {/* 검색 */}
                <div className="flex h-11 w-[320px] items-center justify-between rounded-[12px] bg-[var(--color-gray200)] px-3">
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

                {/* 채널 */}
                <div
                    className={`hide-scrollbar h-[50px] w-full overflow-x-auto ${filter.length > 0 ? "" : "border-b border-b-[var(--color-gray300)]"}`}
                >
                    <div className="flex h-full items-center gap-4 py-[14px]">
                        {channels.map((channel) => (
                            <button
                                className={`h-[50px] w-auto whitespace-nowrap ${selected === channel ? (filter.length > 0 ? "text-[var(--color-gray1000)]" : "border-b-2 border-b-[var(--color-gray1000)] text-[var(--color-gray1000)]") : "text-[var(--color-gray500)]"}`}
                                key={channel}
                                onClick={() => channelHandler(channel)}
                            >
                                {channel}
                            </button>
                        ))}
                    </div>
                </div>

                {filter.length === 0 && <StudyLists />}
                {filter.length > 0 && <StudySearch />}

                {/* 필터 모달 */}
                {isModalOpen && (
                    <FilterModal
                        onClose={() => setIsModalOpen(false)}
                        onApply={(filters: string[]) => searchHandler(filters)}
                    />
                )}

                {/* 스터디 생성버튼 */}
                <div className="fixed right-5 bottom-4 z-30 flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-[500px] bg-[#FF395C] shadow-[0_4px_8px_0_rgba(0,0,0,0,0.32)] hover:bg-[#E02D4D]">
                    <Plus className="h-6 w-6 text-[var(--color-white)]" />
                </div>
            </div>
        </>
    );
}
