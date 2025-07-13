import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import TextArea from "../common/TextArea";

export default function Step5({
    continueStep,
    submitCreate,
}: {
    continueStep: () => void;
    submitCreate: () => void;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [description, setDescription] = useState("");
    const [externalLink, setExternalLink] = useState("");

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!description) return;
        continueStep();
        submitCreate();
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
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value.replace(/^\s+/, ""),
                                )
                            }
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
                            value={externalLink}
                            onChange={(e) => setExternalLink(e.target.value)}
                            className=""
                        />
                    </div>
                </div>
                <div className="absolute bottom-5 w-[calc(100%-40px)]">
                    {description ? (
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
