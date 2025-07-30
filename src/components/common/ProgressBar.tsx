import { useEffect, useState } from "react";

export default function ProgressBar({
    totalStep,
    step,
}: {
    totalStep: number;
    step: number;
}) {
    const [progressWidth, setProgressWidth] = useState(0);

    useEffect(() => {
        setProgressWidth(step * (100 / totalStep));
    }, [step, totalStep]);

    return (
        <div className="bg-gray100 dark:bg-gray800 fixed top-[62px] h-[3px] w-full max-w-sm">
            <div
                className={`bg-main400 absolute top-0 left-0 h-full duration-1500 ease-out`}
                style={{
                    width: `${progressWidth}%`,
                }}
            />

            {[...Array(totalStep - 1)].map((_, i) => (
                <div
                    key={i}
                    className="dark:bg-dark-bg absolute top-0 h-full w-[4px] bg-white duration-200 ease-in"
                    style={{
                        left: `calc(${((i + 1) * 100) / totalStep}% - 2px)`,
                    }}
                />
            ))}
        </div>
    );
}
