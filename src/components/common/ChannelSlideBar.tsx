import { Dispatch, SetStateAction } from "react";

export default function ChannelSlideBar({
    channels,
    channel,
    setChannel,
}: {
    channels: string[];
    channel: string;
    setChannel: Dispatch<SetStateAction<string>>;
}) {
    return (
        <>
            <div className="relative mt-0.5 flex h-[50px] w-full items-center justify-center gap-4 px-5">
                {channels.map((ch) => (
                    <div key={ch} className="flex w-full justify-center">
                        <button
                            onClick={() => setChannel(ch)}
                            className="relative flex h-full w-[calc(50%-8px)] cursor-pointer items-center justify-center"
                        >
                            <h5
                                className={`whitespace-nowrap transition-all duration-200 ease-in-out ${
                                    channel === ch
                                        ? "text-[var(--color-gray1000)]"
                                        : "text-[var(--color-gray500)]"
                                } `}
                            >
                                {ch}
                            </h5>
                        </button>
                    </div>
                ))}
                {/* 슬라이딩 바 */}
                <div className="absolute right-5 bottom-0 left-5">
                    <div
                        className="h-[2px] bg-[var(--color-gray1000)] transition-transform duration-200 ease-in-out"
                        style={{
                            width: "calc(50% - 8px)",
                            transform:
                                channel === channels[0]
                                    ? "translateX(0%)"
                                    : "translateX(calc(100% + 16px))",
                        }}
                    />
                </div>
            </div>
        </>
    );
}
