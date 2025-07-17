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

    const days = [
        { day: "월", enum: "MON" },
        { day: "화", enum: "TUE" },
        { day: "수", enum: "WED" },
        { day: "목", enum: "THU" },
        { day: "금", enum: "FRI" },
        { day: "토", enum: "SAT" },
        { day: "일", enum: "SUN" },
    ];

    return (
        <>
            <div className="flex flex-col gap-1">
                <label className="h6 text-[var(--color-gray1000)]">
                    스터디 요일
                </label>
                <div className="flex flex-wrap gap-2">
                    {days.map((day) => (
                        <button
                            className={`days-btn ${daysOfWeek.includes(day.enum) && "days-btn-selected"}`}
                            onClick={() => toggleDay(day.enum)}
                            type="button"
                            key={day.enum}
                        >
                            {day.day}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
