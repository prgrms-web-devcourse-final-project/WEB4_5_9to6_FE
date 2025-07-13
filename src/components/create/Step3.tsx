import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { ChevronDown } from "lucide-react";

export default function Step3({ continueStep }: { continueStep: () => void }) {
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

    return (
        <>
            <form className="step-form" onSubmit={(e) => submitHandler(e)}>
                <h1
                    className={`mb-2 cursor-default text-[24px] font-semibold text-[var(--color-gray1000)] delay-700 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    어디서 하나요?
                </h1>
                <div className="mt-5 flex flex-col gap-4">
                    <div
                        className={`delay-1100 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="온/오프라인 선택"
                            value={category}
                            label="온/오프라인"
                            className="cursor-pointer"
                            icon={<ChevronDown strokeWidth={1} size={20} />}
                            readOnly
                        />
                    </div>
                    <div
                        className={`delay-1300 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="지역 선택"
                            value={maxMember}
                            label="지역"
                            className="cursor-pointer"
                            icon={<ChevronDown strokeWidth={1} size={20} />}
                            readOnly
                        />
                    </div>
                    <div
                        className={`delay-1500 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="상세 장소 입력"
                            label="상세 장소 (선택)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
