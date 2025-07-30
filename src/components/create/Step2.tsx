import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { Calendar, ChevronDown } from "lucide-react";
import SelectDays from "./SelectDays";
import TimeModal from "./TimeModal";
import DateModal from "./DateModal";
import { useStudyStore } from "@/stores/studyStore";

export default function Step2({
    continueStep,
    isEdit,
}: {
    continueStep: () => void;
    isEdit?: boolean;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const daysOfWeek = useStudyStore((state) => state.studyData.schedules);
    const startTime = useStudyStore((state) => state.studyData.startTime);
    const endTime = useStudyStore((state) => state.studyData.endTime);
    const startDate = useStudyStore((state) => state.studyData.startDate);
    const endDate = useStudyStore((state) => state.studyData.endDate);
    const [isStartTimeModalOpen, setIsStartTimeModalOpen] = useState(false);
    const [isEndTimeModalOpen, setIsEndTimeModalOpen] = useState(false);
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !(daysOfWeek.length && startTime && endTime && startDate && endDate)
        )
            return;
        continueStep();
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            <form className="step-form" onSubmit={submitHandler}>
                <h1
                    className={`text-gray1000 mb-2 cursor-default text-[24px] font-semibold delay-700 duration-1000 ease-out dark:text-white ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    언제 하나요?
                </h1>
                <div className="mt-5 flex flex-col gap-4">
                    <div
                        className={`delay-1100 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <SelectDays />
                    </div>
                    <div
                        className={`delay-1300 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <div className="flex gap-2">
                            <Input
                                placeholder="시간 선택"
                                label="스터디 시간"
                                value={startTime}
                                className="cursor-pointer"
                                icon={<ChevronDown strokeWidth={1} size={20} />}
                                onClick={() => {
                                    if (!startTime)
                                        useStudyStore
                                            .getState()
                                            .setData("startTime", "12:00");
                                    setIsStartTimeModalOpen(true);
                                }}
                                readOnly
                            />
                            <p className="h3 text-gray1000 mt-10 text-[24px] dark:text-white">
                                ~
                            </p>
                            <Input
                                placeholder="시간 선택"
                                label="&nbsp;"
                                value={endTime}
                                className="cursor-pointer"
                                icon={<ChevronDown strokeWidth={1} size={20} />}
                                onClick={() => {
                                    if (!endTime)
                                        useStudyStore
                                            .getState()
                                            .setData("endTime", "12:00");
                                    setIsEndTimeModalOpen(true);
                                }}
                                readOnly
                            />
                        </div>
                    </div>
                    <div
                        className={`delay-1500 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <div className="flex flex-col gap-1">
                            <Input
                                placeholder="시작일시"
                                icon={<Calendar strokeWidth={1} size={20} />}
                                label="스터디 기간"
                                value={startDate}
                                className={`${isEdit && "text-gray600 dark:text-gray600"} cursor-pointer`}
                                onClick={() =>
                                    isEdit ? {} : setIsDateModalOpen(true)
                                }
                                readOnly
                            />
                            <h6 className="text-gray1000 flex justify-end dark:text-white">
                                부터
                            </h6>
                            <Input
                                placeholder="종료일시"
                                icon={<Calendar strokeWidth={1} size={20} />}
                                value={endDate}
                                className="cursor-pointer"
                                onClick={() => setIsDateModalOpen(true)}
                                readOnly
                            />
                            <h6 className="text-gray1000 flex justify-end dark:text-white">
                                까지
                            </h6>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-5 w-[calc(100%-40px)]">
                    {daysOfWeek.length &&
                    startTime &&
                    endTime &&
                    startDate &&
                    endDate ? (
                        <Button type="submit">다음</Button>
                    ) : (
                        <Button disabled>다음</Button>
                    )}
                </div>
            </form>
            {isStartTimeModalOpen && (
                <TimeModal
                    isOpen={isStartTimeModalOpen}
                    onClose={() => setIsStartTimeModalOpen(false)}
                    title="시작 시간"
                    time={startTime}
                    type="startTime"
                />
            )}
            {isEndTimeModalOpen && (
                <TimeModal
                    isOpen={isEndTimeModalOpen}
                    onClose={() => setIsEndTimeModalOpen(false)}
                    title="종료 시간"
                    time={endTime}
                    type="endTime"
                />
            )}
            {isDateModalOpen && (
                <DateModal
                    isOpen={isDateModalOpen}
                    onClose={() => setIsDateModalOpen(false)}
                    isEdit={isEdit}
                />
            )}
        </>
    );
}
