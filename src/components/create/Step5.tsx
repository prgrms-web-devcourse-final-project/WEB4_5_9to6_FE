import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import { useStudyStore } from "@/stores/studyStore";

export default function Step5({
    continueStep,
    submitCreate,
    isEdit,
}: {
    continueStep: () => void;
    submitCreate: () => void;
    isEdit?: boolean;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const description = useStudyStore((state) => state.studyData.description);
    const externalLink = useStudyStore((state) => state.studyData.externalLink);
    const [descriptionError, setDescriptionError] = useState(false);
    const [externalLinkError, setExternalLinkError] = useState(false);
    const [isPreSubmitted, setIsPreSubmitted] = useState(false);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!description || descriptionError || externalLinkError) return;
        setIsPreSubmitted(true);
        continueStep();
        submitCreate();
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (description) {
            if (description.length > 500) {
                setDescriptionError(true);
            } else {
                setDescriptionError(false);
            }
        } else {
            setDescriptionError(false);
        }
    }, [description]);

    useEffect(() => {
        if (externalLink) {
            if (
                !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i.test(
                    externalLink,
                )
            ) {
                setExternalLinkError(true);
            } else {
                setExternalLinkError(false);
            }
        } else {
            setExternalLinkError(false);
        }
    }, [externalLink]);

    return (
        <>
            <form className="step-form" onSubmit={(e) => submitHandler(e)}>
                <h1
                    className={`mb-2 cursor-default text-[24px] leading-tight font-semibold text-[var(--color-gray1000)] delay-700 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
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
                                useStudyStore
                                    .getState()
                                    .setData(
                                        "description",
                                        e.target.value.replace(/^\s+/, ""),
                                    )
                            }
                            label="소개글"
                            className="h-[159px] pb-[100px]"
                            error={descriptionError}
                            errorMsg="소개글은 500자 이하여야 합니다."
                        />
                    </div>
                    <div
                        className={`relative delay-1300 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="강의 링크를 입력해주세요"
                            label="외부 강의 링크 (선택)"
                            value={externalLink}
                            onChange={(e) =>
                                useStudyStore
                                    .getState()
                                    .setData("externalLink", e.target.value)
                            }
                            error={externalLinkError}
                            errorMsg="링크 형식이 아닙니다."
                        />
                    </div>
                </div>
                <div className="absolute bottom-5 w-[calc(100%-40px)]">
                    {description &&
                    !descriptionError &&
                    !externalLinkError &&
                    !isPreSubmitted ? (
                        <Button type="submit" color="primary">
                            스터디{isEdit ? " 수정" : " 생성"}
                        </Button>
                    ) : (
                        <Button disabled>
                            스터디{isEdit ? " 수정" : " 생성"}
                        </Button>
                    )}
                </div>
            </form>
        </>
    );
}
