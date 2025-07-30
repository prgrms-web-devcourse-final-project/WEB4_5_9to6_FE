import Button from "@/components/common/Button";
import DayInput from "./DayInput";
import { useEffect, useState } from "react";

export default function Step4({
    continueStep,
    requestBirthday,
    requestGender,
    submitSignUp,
}: {
    continueStep: () => void;
    requestBirthday: (birthday: string) => void;
    requestGender: (gender: string) => void;
    submitSignUp: () => void;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [isPreSubmitted, setIsPreSubmitted] = useState(false);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!birthday || !gender) return;

        setIsPreSubmitted(true);
        requestBirthday(birthday);
        requestGender(gender);
        continueStep();
        submitSignUp();
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            <form className="step-form" onSubmit={(e) => submitHandler(e)}>
                <h1
                    className={`mb-2 cursor-default text-[24px] font-semibold delay-700 duration-1000 ease-out dark:text-white ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    당신에 대해 더 알려주세요!
                </h1>
                <p
                    className={`h6 text-gray600 mb-5 cursor-default delay-900 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    프로필 생성을 위해 생년월일과 성별이 필요해요.
                </p>
                <div className="flex flex-col gap-2">
                    <div
                        className={`delay-1300 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <DayInput
                            placeholder="생년월일 선택"
                            value={birthday}
                            setValue={setBirthday}
                        />
                    </div>
                    <div
                        className={`flex h-12 w-full flex-row justify-between gap-2 delay-1800 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <button
                            className={`text-gray1000 w-full cursor-pointer rounded-[12px] border duration-200 ease-in-out dark:text-white ${gender === "MALE" ? "border-gray1000 dark:border-gray600 dark:bg-gray1000 hover:border-gray1000 dark:hover:border-gray600" : "dark:border-gray800 border-gray300 hover:border-gray400 dark:hover:border-gray700"}`}
                            type="button"
                            onClick={() => setGender("MALE")}
                        >
                            남자
                        </button>
                        <button
                            className={`text-gray1000 w-full cursor-pointer rounded-[12px] border duration-200 ease-in-out dark:text-white ${gender === "FEMALE" ? "border-gray1000 dark:border-gray600 dark:bg-gray1000 hover:border-gray1000 dark:hover:border-gray600" : "dark:border-gray800 border-gray300 hover:border-gray400 dark:hover:border-gray700"}`}
                            type="button"
                            onClick={() => setGender("FEMALE")}
                        >
                            여자
                        </button>
                    </div>
                </div>
                <div className="absolute bottom-5 w-[calc(100%-40px)]">
                    {birthday && gender && !isPreSubmitted ? (
                        <Button type="submit" color="primary">
                            완료하기
                        </Button>
                    ) : (
                        <Button disabled>완료하기</Button>
                    )}
                </div>
            </form>
        </>
    );
}
