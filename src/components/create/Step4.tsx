import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { Trash2 } from "lucide-react";

export default function Step4({ continueStep }: { continueStep: () => void }) {
    const [isMounted, setIsMounted] = useState(false);
    const [isCategorySet, setIsCategorySet] = useState(0);
    const [category, setCategory] = useState("");
    const [maxMember, setMaxMember] = useState("");
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        continueStep();

        if (isCategorySet) {
            if (!category || nameError) return;
            continueStep();
        } else {
            if (!category || nameError) return;
            // sendEmail(email); Todo: 백엔드 로직 완성시 수정
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
                    스터디 목표를 알려주세요
                </h1>
                <div className="mt-5 flex flex-col gap-1">
                    <div
                        className={`delay-1100 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="주간 목표 입력"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="스터디 목표"
                        />
                        {false && (
                            <Input
                                placeholder="주간 목표 입력"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                icon={<Trash2 strokeWidth={1} size={20} />}
                            />
                        )}
                    </div>
                    <div
                        className={`delay-1300 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Button
                            type="button"
                            color="gray"
                            className="bg-[var(--color-gray100)] pb-1.5 text-4xl font-extralight hover:bg-[var(--color-gray200)]"
                        >
                            +
                        </Button>
                    </div>
                </div>
                <div className="h-[] absolute bottom-5 w-[calc(100%-40px)]">
                    {false ? (
                        <Button type="submit">다음</Button>
                    ) : (
                        <Button type="submit" color="gray">
                            건너뛰기
                        </Button>
                    )}
                </div>
            </form>
        </>
    );
}
