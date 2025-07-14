"use client";

import { Plus } from "lucide-react";
import FilterModal from "@/components/studyList/FilterModal";
import StudyLists from "@/components/studyList/StudyLists";
import SearchResult from "@/components/studyList/SearchResult";
import SearchBar from "@/components/studyList/SearchBar";
import Channel from "@/components/studyList/Channel";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState("전체");
    const [search, setSearch] = useState(""); //검색어
    const [filter, setFilter] = useState<string[]>([]); //지역,활동상태

    const channelHandler = (channel: string) => {
        setSelected(channel);
    };
    const searchHandler = (filters: string[]) => {
        setFilter(filters);
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="hide-scrollbar mb-[72px] h-screen min-w-[360px] overflow-y-auto">
                <div className="fixed top-[62px] z-20 w-full bg-[var(--color-gray100)]/60 px-5 backdrop-blur-xl">
                    {/* 검색 */}
                    <SearchBar
                        setIsModalOpen={setIsModalOpen}
                        search={search}
                        setSearch={setSearch}
                    />

                    {/* 채널 */}
                    <Channel
                        filter={filter}
                        search={search}
                        channelHandler={channelHandler}
                        selected={selected}
                    />
                </div>
                <div className="min-h-screen pt-[164px]">
                    <div className="min-h-screen w-full bg-[var(--color-gray100)] pt-[19px]">
                        {filter.length === 0 && search === "" && <StudyLists />}
                        {(filter.length > 0 || search !== "") && (
                            <SearchResult
                                search={search}
                                filter={filter}
                                setFilter={setFilter}
                            />
                        )}

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
                        <Link href="/create">
                            <div className="fixed right-5 bottom-22 z-30 flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-[500px] bg-[var(--color-main400)] shadow-[0_4px_8px_0_rgba(0,0,0,0.32)] transition-all duration-200 ease-in-out hover:bg-[var(--color-main500)]">
                                <Plus className="h-6 w-6 text-[var(--color-white)]" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
