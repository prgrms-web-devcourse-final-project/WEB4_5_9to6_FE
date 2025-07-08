import Image from "next/image";
import search from "@/assets/search.svg";
export default function page() {
    return (
        <>
            <div className="flex w-[360px] justify-center">
                {/* 검색 */}
                <div className="mx-5 flex h-11 w-full rounded-[12px] bg-gray-200 px-3 py-[13px]">
                    <Image
                        src={search}
                        alt="검색"
                        width={18}
                        height={18}
                        className="text-gray-600"
                    />
                    <span className="b2 ml-[6px] text-gray-600">
                        관심있는 스터디를 검색해보세요!
                    </span>
                </div>
            </div>
        </>
    );
}
