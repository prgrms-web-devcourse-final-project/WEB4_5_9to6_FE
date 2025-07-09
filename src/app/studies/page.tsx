"use client";

import { Plus } from "lucide-react";
import FilterModal from "@/components/studyList/FilterModal";
import StudyLists from "@/components/studyList/StudyLists";
import SearchResult from "@/components/studyList/SearchResult";
import SearchBar from "@/components/studyList/SearchBar";
import Channel from "@/components/studyList/Channel";
import { useState } from "react";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState("전체");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<string[]>([]);

    const channelHandler = (channel: string) => {
        setSelected(channel);
    };
    const searchHandler = (filters: string[]) => {
        setFilter(filters);
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="pt-[62px]">
                <div className="min-w-[360px] bg-[var(--color-gray100)] pt-[19px] pl-5">
                    {/* 검색 */}
                    <SearchBar
                        setIsModalOpen={setIsModalOpen}
                        search={search}
                        setSearch={setSearch}
                    />

                    {/* 채널 */}
                    <Channel
                        filter={filter}
                        channelHandler={channelHandler}
                        selected={selected}
                    />

                    {filter.length === 0 && <StudyLists />}
                    {filter.length > 0 && <SearchResult />}

                    {/* 필터 모달 */}
                    {isModalOpen && (
                        <FilterModal
                            onClose={() => setIsModalOpen(false)}
                            onApply={(filters: string[]) =>
                                searchHandler(filters)
                            }
                        />
                    )}

                    {/* 스터디 생성버튼 */}
                    <div className="fixed right-5 bottom-4 z-30 flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-[500px] bg-[#FF395C] shadow-[0_4px_8px_0_rgba(0,0,0,0,0.32)] hover:bg-[#E02D4D]">
                        <Plus className="h-6 w-6 text-[var(--color-white)]" />
                    </div>
                </div>
            </div>
        </>
    );
}
