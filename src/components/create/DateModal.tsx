import { DayPicker, DateRange } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { ko } from "date-fns/locale";

export default function DateModal({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    onClose,
}: {
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    onClose: () => void;
}) {
    const selectedRange: DateRange = {
        from: startDate ? new Date(startDate) : undefined,
        to: endDate ? new Date(endDate) : undefined,
    };

    const handleSelect = (range: DateRange | undefined) => {
        if (!range) return;

        if (range.from) {
            setStartDate(format(range.from, "yyyy-MM-dd"));
        }
        if (range.to) {
            setEndDate(format(range.to, "yyyy-MM-dd"));
        }
    };

    return (
        <div className="fixed inset-0 z-2 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="z-2 flex w-sm justify-center rounded-[24px] bg-white p-4">
                <DayPicker
                    mode="range"
                    selected={selectedRange}
                    onSelect={handleSelect}
                    captionLayout="dropdown"
                    fromYear={new Date().getFullYear()}
                    toYear={new Date().getFullYear() + 30}
                    locale={ko}
                    navLayout="around"
                    disabled={{ before: new Date() }}
                    classNames={{
                        selected:
                            "bg-[var(--color-main400)] text-white rounded-[10px]",
                        today: "text-[var(--color-main400)] font-semibold",
                        range_middle: "bg-[var(--color-main400)] rounded-none",
                        range_start: "bg-[var(--color-main400)] rounded-l-full",
                        range_end: "bg-[var(--color-main400)] rounded-r-full",
                    }}
                    style={
                        {
                            "--rdp-accent-color": "var(--color-main400)",
                        } as React.CSSProperties
                    }
                />
            </div>
        </div>
    );
}
