import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { Calendar, ChevronDown } from "lucide-react";
import SelectDays from "./SelectDays";

export default function Step2({ continueStep }: { continueStep: () => void }) {
    const [isMounted, setIsMounted] = useState(false);
    const [isCategorySet, setIsCategorySet] = useState(0);
    const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        continueStep();

        // if (isCategorySet) {
        //     if (!category || nameError) return;
        //     continueStep();
        // } else {
        //     if (!category || nameError) return;
        //     // sendEmail(email); Todo: 백엔드 로직 완성시 수정
        //     setIsCategorySet(1);
        // }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            <form className="step-form" onSubmit={(e) => submitHandler(e)}>
                <h1
                    className={`mb-2 cursor-default text-[24px] font-semibold text-[var(--color-gray1000)] delay-700 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    언제 하나요?
                </h1>
                <div className="mt-5 flex flex-col gap-4">
                    <div
                        className={`delay-1100 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <SelectDays
                            daysOfWeek={daysOfWeek}
                            setDaysOfWeek={setDaysOfWeek}
                        />
                    </div>
                    <div
                        className={`delay-1300 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <div className="flex gap-2">
                            <Input
                                placeholder="시간 선택"
                                label="스터디 시간"
                                className="cursor-pointer"
                                icon={<ChevronDown strokeWidth={1} size={20} />}
                                readOnly
                            />
                            <p className="h3 mt-10 text-[24px]">~</p>
                            <Input
                                placeholder="시간 선택"
                                label="&nbsp;"
                                className="cursor-pointer"
                                icon={<ChevronDown strokeWidth={1} size={20} />}
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
                                className="cursor-pointer"
                                readOnly
                            />
                            <h6 className="flex justify-end text-[var(--color-gray1000)]">
                                부터
                            </h6>
                            <Input
                                placeholder="종료일시"
                                icon={<Calendar strokeWidth={1} size={20} />}
                                className="cursor-pointer"
                                readOnly
                            />
                            <h6 className="flex justify-end text-[var(--color-gray1000)]">
                                까지
                            </h6>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-5 w-[calc(100%-40px)]">
                    {true ? (
                        <Button type="submit">다음</Button>
                    ) : (
                        <Button disabled>다음</Button>
                    )}
                </div>
            </form>
        </>
    );
}
