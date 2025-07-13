import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { ChevronDown } from "lucide-react";
import MaxMemberModal from "./MaxMemberModal";
import CategoryModal from "./CategoryModal";

export default function Step1({ continueStep }: { continueStep: () => void }) {
    const [isMounted, setIsMounted] = useState(false);
    const [category, setCategory] = useState("");
    const [maxMember, setMaxMember] = useState("");
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isMaxMemberModalOpen, setIsMaxMemberModalOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (name) {
            if (name.length < 2 || name.length > 20) {
                setNameError(true);
            } else {
                setNameError(false);
            }
        } else {
            setNameError(false);
        }
    }, [name]);

    return (
        <>
            <form className="step-form" onSubmit={continueStep}>
                <h1
                    className={`mb-2 cursor-default text-[24px] font-semibold text-[var(--color-gray1000)] delay-700 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    스터디 정보를 알려주세요
                </h1>
                <div className="mt-5 flex flex-col gap-4">
                    <div
                        className={`delay-1100 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                        onClick={() => setIsCategoryModalOpen(true)}
                    >
                        <Input
                            placeholder="카테고리 선택"
                            value={category}
                            label="스터디 카테고리"
                            className="cursor-pointer"
                            icon={<ChevronDown strokeWidth={1} size={20} />}
                            readOnly
                        />
                    </div>
                    <div
                        className={`delay-1300 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                        onClick={() => {
                            if (!maxMember) setMaxMember("5");
                            setIsMaxMemberModalOpen(true);
                        }}
                    >
                        <Input
                            placeholder="최대 인원 선택"
                            value={maxMember ? `${maxMember}명` : ""}
                            label="최대 인원"
                            className="cursor-pointer"
                            icon={<ChevronDown strokeWidth={1} size={20} />}
                            readOnly
                        />
                    </div>
                    <div
                        className={`delay-1500 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="스터디명 입력"
                            label="스터디명"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value.replace(/\s/g, ""))
                            }
                            error={nameError}
                            errorMsg="스터디명은 2자 이상, 20자 이하여야 합니다."
                        />
                    </div>
                </div>
                <div className="absolute bottom-5 w-[calc(100%-40px)]">
                    {category && maxMember && name && !nameError ? (
                        <Button type="submit">다음</Button>
                    ) : (
                        <Button disabled>다음</Button>
                    )}
                </div>
            </form>
            {isCategoryModalOpen && (
                <CategoryModal
                    category={category}
                    setCategory={setCategory}
                    onClose={() => setIsCategoryModalOpen(false)}
                />
            )}
            {isMaxMemberModalOpen && (
                <MaxMemberModal
                    maxMember={maxMember}
                    setMaxMember={setMaxMember}
                    onClose={() => setIsMaxMemberModalOpen(false)}
                />
            )}
        </>
    );
}
