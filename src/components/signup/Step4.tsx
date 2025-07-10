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

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!birthday || !gender) return;

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
            <form
                className="relative h-[calc(100%-65px)] w-full p-5 pt-10"
                onSubmit={(e) => submitHandler(e)}
            >
                <h1
                    className={`mb-2 cursor-default text-[24px] font-semibold delay-900 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    당신에 대해 더 알려주세요!
                </h1>
                <p
                    className={`h6 mb-5 cursor-default text-[var(--color-gray600)] delay-1100 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    프로필 생성을 위해 생년월일과 성별이 필요해요.
                </p>
                <div className="flex flex-col gap-2">
                    <div
                        className={`delay-1500 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
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
                            className={`w-full cursor-pointer rounded-[12px] border border-[var(--color-gray300)] duration-200 ease-in-out hover:border-[var(--color-gray400)] ${gender === "MALE" && "border-[var(--color-gray1000)] hover:border-[var(--color-gray1000)]"}`}
                            type="button"
                            onClick={() => setGender("MALE")}
                        >
                            남자
                        </button>
                        <button
                            className={`w-full cursor-pointer rounded-[12px] border border-[var(--color-gray300)] duration-200 ease-in-out hover:border-[var(--color-gray400)] ${gender === "FEMALE" && "border-[var(--color-gray1000)] hover:border-[var(--color-gray1000)]"}`}
                            type="button"
                            onClick={() => setGender("FEMALE")}
                        >
                            여자
                        </button>
                    </div>
                </div>
                <div className="absolute bottom-5 w-[calc(100%-40px)]">
                    {birthday && gender ? (
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
