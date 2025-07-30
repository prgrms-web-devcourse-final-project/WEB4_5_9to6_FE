"use client";

import { ChevronUp, Plus } from "lucide-react";
import flash from "@/assets/Flash--filled.svg";
import FilterModal from "@/components/studyList/FilterModal";
import StudyLists from "@/components/studyList/StudyLists";
import SearchBar from "@/components/studyList/SearchBar";
import Channel from "@/components/studyList/Channel";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { defaultSearch, survSearch } from "@/api/studies";
import { useAuthStore } from "@/stores/authStore";
import useDebounce from "@/hooks/useDebounce";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { regionMap } from "@/utils/studyDataMap";
import Image from "next/image";
import StudyCardSkeleton from "@/components/common/StudyCardSkeleton";
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

    const searchHandler = (filters: Filtering) => {
        console.log("필터링값들:", filters);
        if (filters.status === "") filters.status = "활동 전체";
        if (filters.region === "") filters.region = "ALL";
        console.log("필터링값들updated:", filters);
        setFilter(filters);
        setIsModalOpen(false);
    };

    const removeFilter = (type: "region" | "status") => {
        setFilter((prev) => ({
            ...prev,
            [type]: type === "region" ? "ALL" : "활동 전체",
            [`${type}Select`]: false,
        }));
    };

    const isLogIn = useAuthStore((state) => state.isLogIn); //유저정보
    const debouncedInput = useDebounce(search, 200); //검색
    const observerRef = useRef<HTMLDivElement | null>(null); //무한스크롤

    //활동상태 계산
    const calActive = (startDate: string) => {
        const now = new Date();
        const start = new Date(startDate);
        return now < start ? "활동 전" : "활동중";
    };

    //데이터 불러오기
    const {
        data: defaultData,
        fetchNextPage: fetchNextDefault,
        hasNextPage: hasMoreDefault,
        isFetchingNextPage: isLoadingDefault,
        isPending: isLoading,
    } = useInfiniteQuery<StudyList[], Error>({
        queryKey: ["defaultStudiesList", filter, debouncedInput, selected],
        queryFn: ({ pageParam = 1 }) =>
            defaultSearch({
                page: pageParam as number,
                size: 15,
                category: category[selected],
                region: filter.region,
                status: "ALL",
                name: debouncedInput || "",
            }),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length < 15 ? undefined : allPages.length + 1,
        initialPageParam: 1,
        staleTime: 1000 * 60 * 3, //3분
    });

    const { data: survData, isPending: isLoadingSurv } = useQuery<
        StudyList[],
        Error
    >({
        queryKey: ["survStudiesList", filter, debouncedInput, selected],
        queryFn: () =>
            survSearch({
                page: 1,
                size: 15,
                category: category[selected],
                region: filter.region,
                status: "ALL",
                name: debouncedInput || "",
            }),
        staleTime: 1000 * 60 * 3,
    });

    const defaultStudies =
        filter.status === "활동 전체"
            ? (defaultData?.pages.flat() ?? [])
            : (defaultData?.pages.flat() ?? []).filter(
                  (s) => calActive(s.startDate) === filter?.status,
              );
    const survStudies =
        filter.status === "활동 전체"
            ? (survData ?? [])
            : (survData ?? []).filter(
                  (s) => calActive(s.startDate) === filter?.status,
              );

    //페이지네이션
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    !isLoadingDefault &&
                    hasMoreDefault
                ) {
                    fetchNextDefault();
                }
            },
            { threshold: 0.1, rootMargin: "50px" },
        );
        const target = observerRef.current;

        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [hasMoreDefault, fetchNextDefault, isLoadingDefault]);

    // top버튼
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <>
            <div className="mb-[72px] min-h-screen min-w-86 overflow-y-auto bg-[var(--color-gray100)]">
                <div className="fixed top-[62px] z-50 w-full bg-[var(--color-gray100)] px-5">
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

                <div className="mt-[156px] h-full">
                    <div className="h-full w-full pt-[19px] pb-[30px]">
                        {/* 필터링 뱃지 */}
                        {(filter.regionSelect || filter.statusSelect) && (
                            <div className="fixed top-[146px] left-5 z-30 flex h-8 w-full items-center gap-[8px] bg-[var(--color-gray100)] py-1">
                                {filter.regionSelect && (
                                    <button
                                        className="flex h-full w-auto cursor-pointer items-center rounded-3xl bg-[#454545] px-[9px] text-[11px] text-[#FFFFFF]"
                                        onClick={() => removeFilter("region")}
                                    >
                                        {regionMap[filter.region]}
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

                        {/* 로딩 중일 때 */}
                        {isLoading || isLoadingSurv ? (
                            <>
                                <div className="mt-6 pl-5">
                                    <div className="flex items-center">
                                        <Image
                                            src={flash}
                                            alt="서바이벌"
                                            style={{
                                                width: 18,
                                                height: "auto",
                                            }}
                                        />
                                        <h3 className="text-gray1000">
                                            서바이벌 스터디
                                        </h3>
                                    </div>
                                    <h6 className="text-gray700 mt-1 mb-4">
                                        매주 Ai가 내는 카테고리별 퀴즈를 풀면
                                        생존!
                                    </h6>
                                    <div className="w-full overflow-x-hidden">
                                        <div className="flex w-fit gap-4">
                                            <div className="bg-gray200 h-[206px] min-w-[188px] animate-pulse rounded-2xl"></div>
                                            <div className="bg-gray200 h-[206px] min-w-[188px] animate-pulse rounded-2xl"></div>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-gray1000 mt-8 px-5">
                                    어떤 스터디를 하고싶나요?
                                </h3>
                                <div className="flex flex-col gap-4 px-5">
                                    {[...Array(5)].map((_, i) => (
                                        <StudyCardSkeleton key={i} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <StudyLists
                                defaultStudies={defaultStudies}
                                survStudies={survStudies}
                                search={search}
                            />
                        )}

                        {/* 무한스크롤 감지 */}
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
                        {/* top 버튼 */}
                        <button
                            onClick={scrollToTop}
                            className={`fixed right-5 ${isLogIn ? "bottom-[150px]" : "bottom-22"} z-30 flex h-[52px] w-[52px] cursor-pointer flex-col items-center rounded-[500px] bg-[var(--color-gray200)] shadow-[0_4px_8px_0_rgba(0,0,0,0.32)] transition-all duration-200 ease-in-out hover:bg-[var(--color-gray300)]`}
                        >
                            <ChevronUp className="mt-1 h-5 w-5 text-[var(--color-gray600)]" />
                            <p className="mb-2 text-[13px] text-[var(--color-gray600)]">
                                TOP
                            </p>
                        </button>
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
