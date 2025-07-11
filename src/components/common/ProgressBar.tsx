import { useEffect, useState } from "react";

export default function ProgressBar({ step }: { step: number }) {
    const [progressWidth, setProgressWidth] = useState(0);

    useEffect(() => {
        setProgressWidth(step * 20);
    }, [step]);

    return (
        <div className="fixed top-[62px] h-[3px] w-full bg-[var(--color-gray100)]">
            <div
                className={`absolute top-0 left-0 h-full bg-[var(--color-main400)] duration-1500 ease-out`}
                style={{
                    width: `${progressWidth}%`,
                }}
            />

            <div className="absolute top-0 left-[calc(20%-2px)] h-full w-[4px] bg-white" />
            <div className="absolute top-0 left-[calc(40%-2px)] h-full w-[4px] bg-white" />
            <div className="absolute top-0 left-[calc(60%-2px)] h-full w-[4px] bg-white" />
            <div className="absolute top-0 left-[calc(80%-2px)] h-full w-[4px] bg-white" />
        </div>
    );
}
