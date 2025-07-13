import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { ChevronDown } from "lucide-react";
import TextArea from "../common/TextArea";

export default function Step5({
    continueStep,
    submitCreate,
}: {
    continueStep: () => void;
    submitCreate: () => void;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [isCategorySet, setIsCategorySet] = useState(0);
    const [category, setCategory] = useState("");
    const [maxMember, setMaxMember] = useState("");
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        continueStep();
        submitCreate();

        if (isCategorySet) {
            if (!category || nameError) return;
            continueStep();
        } else {
            if (!category || nameError) return;
            setIsCategorySet(1);
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (
            category &&
            !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(category)
        ) {
            setNameError(true);
        } else {
            setNameError(false);
        }
    }, [category]);

    return (
        <>
            <form className="step-form" onSubmit={(e) => submitHandler(e)}>
                <h1
                    className={`mb-2 cursor-default text-[24px] font-semibold text-[var(--color-gray1000)] delay-700 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    마지막으로
                    <br />
                    소개글을 작성해주세요
                </h1>
                <div className="mt-5 flex flex-col gap-4">
                    <div
                        className={`relative delay-1100 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <TextArea
                            placeholder="스터디 소개글을 작성해주세요"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            label="소개글"
                            className="h-[159px] pb-[100px]"
                        />
                    </div>
                    <div
                        className={`relative delay-1300 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="강의 링크를 입력해주세요"
                            label="외부 강의 링크 (선택)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="absolute bottom-5 w-[calc(100%-40px)]">
                    {true ? (
                        <Button type="submit" color="primary">
                            스터디 생성
                        </Button>
                    ) : (
                        <Button disabled>스터디 생성</Button>
                    )}
                </div>
            </form>
        </>
    );
}
