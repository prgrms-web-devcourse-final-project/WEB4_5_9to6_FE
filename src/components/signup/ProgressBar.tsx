export default function ProgressBar({ step }: { step: number }) {
    return (
        <>
            <div className="grid h-[3px] w-full grid-cols-5 gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-full ${
                            i < step
                                ? "w-full bg-[var(--color-main400)]"
                                : "w-full bg-[var(--color-gray100)]"
                        }`}
                    />
                ))}
            </div>
        </>
    );
}
