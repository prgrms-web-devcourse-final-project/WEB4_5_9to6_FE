import { useShopModalStore } from "@/stores/shopModalStore";
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
    const { typeChange } = useShopModalStore(); // 리워드 상점인 경우에만

    const selectedIndex = channels.indexOf(channel);
    const itemWidthPercent = 100 / channels.length;
    const tabGap = [0, 15, 30];

    return (
        <>
            <div className="relative mt-0.5 flex h-[50px] w-full items-center justify-center gap-4 px-5">
                {channels.map((ch) => (
                    <div key={ch} className="flex w-full justify-center">
                        <button
                            onClick={() => {
                                setChannel(ch);
                                typeChange(ch);
                            }}
                            className="relative flex h-full w-[calc(50%-8px)] cursor-pointer items-center justify-center"
                        >
                            <h5
                                className={`hover:text-gray1000 whitespace-nowrap transition-colors duration-200 ease-in-out ${
                                    channel === ch
                                        ? "text-gray1000"
                                        : "text-gray500"
                                } `}
                            >
                                {ch}
                            </h5>
                        </button>
                    </div>
                ))}

                <div className="border-b-gray400 absolute right-5 bottom-0 left-5 border-b">
                    <div
                        className="bg-gray1000 h-[2px] transition-transform duration-200 ease-in-out"
                        style={{
                            width: `calc(${itemWidthPercent}% - 9px)`,
                            transform: `translateX(calc(${selectedIndex * 100}% + ${tabGap[selectedIndex]}px))`,
                        }}
                    />
                </div>
            </div>
        </>
    );
}
