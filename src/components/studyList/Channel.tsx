"use client";

export default function Channel({
    filter,
    search,
    channelHandler,
    selected,
}: {
    filter: string[];
    search: string;
    channelHandler: (channel: string) => void;
    selected: string;
}) {
    const channels = [
        "전체",
        "어학",
        "취업",
        "프로그래밍",
        "고시&공무원",
        "수능&내신",
        "기타",
    ];
    return (
        <>
            <div
                className={`hide-scrollbar mt-[7px] h-[51px] w-full overflow-x-auto pl-5 ${filter.length > 0 || search !== "" ? "border-b-2 border-b-[var(--color-gray100)]" : "border-b border-b-[var(--color-gray300)]"}`}
            >
                <div className="flex h-full items-center gap-4 py-[14px]">
                    {channels.map((channel) => (
                        <button
                            className={`h-[50px] w-auto cursor-pointer border-b-2 border-[var(--color-gray100)]/0 px-4 whitespace-nowrap transition-all duration-200 ease-in-out ${selected === channel ? (filter.length > 0 || search !== "" ? "text-[var(--color-gray1000)]" : "border-b-[var(--color-gray1000)] text-[var(--color-gray1000)]") : "text-[var(--color-gray500)]"}`}
                            key={channel}
                            onClick={() => channelHandler(channel)}
                        >
                            {channel}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
