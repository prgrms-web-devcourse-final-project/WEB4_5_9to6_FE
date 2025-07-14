export default function SelectDays({
    daysOfWeek,
    setDaysOfWeek,
}: {
    daysOfWeek: string[];
    setDaysOfWeek: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const toggleDay = (day: string) => {
        if (daysOfWeek.includes(day)) {
            setDaysOfWeek((daysOfWeek) => daysOfWeek.filter((d) => d !== day));
        } else {
            setDaysOfWeek((daysOfWeek) => [...daysOfWeek, day]);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-1">
                <label className="h6 text-[var(--color-gray1000)]">
                    스터디 요일
                </label>
                <div className="flex flex-wrap gap-2">
                    {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                        <button
                            className={`days-btn ${daysOfWeek.includes(day) && "days-btn-selected"}`}
                            onClick={() => toggleDay(day)}
                            type="button"
                            key={day}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
