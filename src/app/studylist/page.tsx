"use client";

import { Plus } from "lucide-react";
import FilterModal from "@/components/studyList/FilterModal";
import StudyLists from "@/components/studyList/StudyLists";
import SearchBar from "@/components/studyList/SearchBar";
import Channel from "@/components/studyList/Channel";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { studySearch } from "@/api/studies";
import { Study } from "@/types/study";
import useDebounce from "@/hooks/useDebounce";
const category: Record<string, string> = {
    전체: "ALL",
    어학: "LANGUAGE",
    취업: "JOB",
    프로그래밍: "PROGRAMMING",
    "고시&공무원": "EXAM_PUBLIC",
    "수능&내신": "EXAM_SCHOOL",
    기타: "ETC",
};
interface Filtering {
    region: string;
    status: string;
    regionSelect: boolean;
    statusSelect: boolean;
}
import { useAuthStore } from "@/stores/authStore";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState("전체");
    const [search, setSearch] = useState(""); //검색어
    const [filter, setFilter] = useState<Filtering>({
        region: "ALL",
        status: "활동 전체",
        regionSelect: false,
        statusSelect: false,
    }); //지역,활동상태
    const [studies, setStudies] = useState<Study[]>([]);
    const [defaultStudies, setDefaultStudies] = useState<Study[]>([]);
    const [survStudies, setSurvStudies] = useState<Study[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const searchHandler = (filters: Filtering) => {
        if (filters.region === "") {
            setFilter({ ...filter, region: "ALL", status: filters.status });
        } else if (filters.status === "") {
            setFilter({
                ...filter,
                region: filters.region,
                status: "활동 전체",
            });
        } else {
            setFilter(filters);
        }
        setIsModalOpen(false);
    };
    const isLogIn = useAuthStore((state) => state.isLogIn);
    const removeFilter = (type: "region" | "status") => {
        setFilter((prev) => ({
            ...prev,
            [type]: type === "region" ? "ALL" : "활동 전체",
            [`${type}Select`]: false,
        }));
    };

    const debouncedInput = useDebounce(search, 200);

    //초기화
    useEffect(() => {
        setStudies([]);
        setDefaultStudies([]);
        setSurvStudies([]);
        setPage(1);
        setHasMore(true);
    }, [debouncedInput, filter, selected]);

    //데이터 불러오기
    useEffect(() => {
        const fetchStudies = async () => {
            if (isLoading || !hasMore) return;
            setIsLoading(true);

            try {
                const data: Study[] = await studySearch({
                    page,
                    size: 20,
                    category: category[selected],
                    region: filter.region,
                    status: "ALL",
                    name: debouncedInput || "",
                });
                console.log("데이터 추가요~", data);
                // let filteredData = data;

                const calActive = (startDate: string) => {
                    const now = new Date();
                    const start = new Date(startDate);
                    return now < start ? "활동 전" : "활동중";
                };
                let filtered: Study[] = [];
                //필터
                if (filter.status !== "활동 전체") {
                    console.log("필터링", filter);
                    filtered = data.filter(
                        (s) => calActive(s.startDate) === filter.status,
                    );
                } else {
                    filtered = data;
                }
                // console.log(filtered);

                //서바이벌,일반 분류

                // all = [...all, ...data];

                const defaults = filtered.filter(
                    (s) => s.studyType === "DEFAULT",
                );
                const surv = filtered.filter((s) => s.studyType === "SURVIVAL");

                setStudies((prev) => [...prev, ...filtered]);
                setDefaultStudies((prev) => [...prev, ...defaults]);
                setSurvStudies((prev) => [...prev, ...surv]);
                console.log("서바이벌 스터디", survStudies);
                if (data.length < 10) {
                    setHasMore(false);
                    console.log("finished!!", hasMore);
                }
            } catch (err) {
                if (err) console.error("스터디 검색 에러", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStudies();
    }, [page]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    console.log("로딩 추가페이지!");
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 0.1, rootMargin: "100px" },
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [hasMore, isLoading]);

    return (
        <>
            <div className="hide-scrollbar mb-[72px] h-screen min-w-[360px] overflow-y-auto">
                <div className="fixed top-[62px] z-20 w-full bg-[var(--color-gray100)] px-5">
                    {/* 검색 */}
                    <SearchBar
                        setIsModalOpen={setIsModalOpen}
                        search={search}
                        setSearch={setSearch}
                    />

                    {/* 채널 */}
                    <Channel
                        filter={filter}
                        setSelected={setSelected}
                        selected={selected}
                    />
                </div>

                <div className="min-h-screen pt-[145px]">
                    <div className="min-h-screen w-full bg-[var(--color-gray100)] pt-[19px]">
                        {/* 필터링 뱃지 */}
                        {(filter.regionSelect || filter.statusSelect) && (
                            <div className="mt-[-10px] flex h-6 items-center gap-[8px] px-5">
                                {filter.regionSelect && (
                                    <button
                                        className="flex h-full w-auto cursor-pointer items-center rounded-3xl bg-[#454545] px-[9px] text-[11px] text-[#FFFFFF]"
                                        onClick={() => removeFilter("region")}
                                    >
                                        {filter.region}
                                    </button>
                                )}
                                {filter.statusSelect && (
                                    <button
                                        className="flex h-full w-auto cursor-pointer items-center rounded-3xl bg-[#454545] px-[9px] text-[11px] text-[#FFFFFF]"
                                        onClick={() => removeFilter("status")}
                                    >
                                        {filter.status}
                                    </button>
                                )}
                            </div>
                        )}
                        <StudyLists
                            studies={studies}
                            defaultStudies={defaultStudies}
                            survStudies={survStudies}
                            search={search}
                        />

                        {/* 🧲 무한스크롤 감지용 div */}
                        <div ref={observerRef} className="h-[2px]" />

                        {/* 필터 모달 */}
                        {isModalOpen && (
                            <FilterModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onApply={(filters: Filtering) => {
                                    searchHandler(filters);
                                }}
                            />
                        )}

                        {/* 스터디 생성버튼 */}
                        {isLogIn && (
                            <Link href="/create">
                                <div className="fixed right-5 bottom-22 z-30 flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-[500px] bg-[var(--color-main400)] shadow-[0_4px_8px_0_rgba(0,0,0,0.32)] transition-all duration-200 ease-in-out hover:bg-[var(--color-main500)]">
                                    <Plus className="h-6 w-6 text-[var(--color-white)]" />
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
