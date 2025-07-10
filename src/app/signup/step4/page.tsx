"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import SubHeader from "@/components/common/SubHeader";
import ProgressBar from "@/components/signup/ProgressBar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Step1() {
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const router = useRouter();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!birthday || !gender) return;

        router.push("/signup/success");
    };

    return (
        <>
            <SubHeader>회원가입</SubHeader>
            <ProgressBar step={4} />
            <form
                className="relative h-[calc(100%-65px)] w-full p-5 pt-10"
                onSubmit={(e) => submitHandler(e)}
            >
                <h1 className="mb-2 text-[24px] font-semibold">
                    당신에 대해 더 알려주세요!
                </h1>
                <p className="h6 mb-5 text-[var(--color-gray600)]">
                    프로필 생성을 위해 생년월일과 성별이 필요해요.
                </p>
                <div className="flex flex-col gap-1">
                    <Input
                        placeholder="생년월일 선택"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                    <div className="flex h-12 w-full flex-row justify-between gap-2">
                        <button
                            className={`w-full cursor-pointer rounded-[12px] border border-[var(--color-gray300)] duration-200 ease-in-out hover:border-[var(--color-gray400)] ${gender === "male" && "border-[var(--color-gray1000)] hover:border-[var(--color-gray1000)]"}`}
                            type="button"
                            onClick={() => setGender("male")}
                        >
                            남자
                        </button>
                        <button
                            className={`w-full cursor-pointer rounded-[12px] border border-[var(--color-gray300)] duration-200 ease-in-out hover:border-[var(--color-gray400)] ${gender === "female" && "border-[var(--color-gray1000)] hover:border-[var(--color-gray1000)]"}`}
                            type="button"
                            onClick={() => setGender("female")}
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
