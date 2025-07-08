export default function Button({
    children,
    color = "black",
    icon,
    onClick,
}: {
    children: React.ReactNode;
    color?: "black" | "primary" | "yellow" | "white";
    icon?: string;
    onClick: () => void;
}) {
    return (
        <>
            <button
                className={`h5 h-[50px] w-full cursor-pointer rounded-[12px] transition-all duration-250 ease-in-out ${
                    color === "black"
                        ? "bg-[var(--color-gray1000)] text-white hover:bg-[var(--color-gray900)]"
                        : color === "primary"
                          ? "bg-[var(--color-main500)] text-white hover:bg-[var(--color-main600)]"
                          : color === "yellow"
                            ? "bg-[#F9E95A] text-[#191919] hover:bg-[#EFDE3E]"
                            : "border border-[var(--color-gray300)] text-[#191919] hover:bg-[var(--color-gray100)]"
                }`}
                onClick={onClick}
            >
                <div className="flex items-center justify-center gap-2">
                    {icon && <img src={icon} />}
                    {children}
                </div>
            </button>
        </>
    );
}
