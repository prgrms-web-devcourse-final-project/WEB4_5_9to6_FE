import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { ChevronDown } from "lucide-react";
import OnOfflineModal from "./OnOfflineModal";
import RegionModal from "./RegionModal";
import { useStudyStore } from "@/stores/studyStore";

export default function Step3({ continueStep }: { continueStep: () => void }) {
    const [isMounted, setIsMounted] = useState(false);
    const isOnline = useStudyStore((state) => state.studyData.online);
    const region = useStudyStore((state) => state.studyData.region);
    const place = useStudyStore((state) => state.studyData.place);
    const [placeError, setPlaceError] = useState(false);
    const [isOnOfflineModalOpen, setIsOnOfflineModalOpen] = useState(false);
    const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!(region && !placeError)) return;
        continueStep();
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (place) {
            if (place.length < 2 || place.length > 20) {
                setPlaceError(true);
            } else {
                setPlaceError(false);
            }
        } else {
            setPlaceError(false);
        }
    }, [place]);

    return (
        <>
            <form className="step-form" onSubmit={submitHandler}>
                <h1
                    className={`text-gray1000 mb-2 cursor-default text-[24px] font-semibold delay-700 duration-1000 ease-out dark:text-white ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    어디서 하나요?
                </h1>
                <div className="mt-5 flex flex-col gap-4">
                    <div
                        className={`delay-1100 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="온/오프라인 선택"
                            value={
                                isOnline === null
                                    ? ""
                                    : isOnline
                                      ? "온라인"
                                      : "오프라인"
                            }
                            label="온/오프라인"
                            onClick={() => setIsOnOfflineModalOpen(true)}
                            className="cursor-pointer"
                            icon={<ChevronDown strokeWidth={1} size={20} />}
                            readOnly
                        />
                    </div>
                    <div
                        className={`duration-1000 ease-out ${isOnline !== false && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="지역 선택"
                            value={region === "온라인" ? "" : region}
                            label="지역"
                            onClick={() => setIsRegionModalOpen(true)}
                            className="cursor-pointer"
                            icon={<ChevronDown strokeWidth={1} size={20} />}
                            readOnly
                        />
                    </div>
                    <div
                        className={`delay-200 duration-1000 ease-out ${isOnline !== false && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="상세 장소 입력"
                            label="상세 장소 (선택)"
                            value={place ?? ""}
                            onChange={(e) =>
                                useStudyStore
                                    .getState()
                                    .setData(
                                        "place",
                                        e.target.value.replace(/^\s+/, ""),
                                    )
                            }
                            error={placeError}
                            errorMsg="상세 장소는 2자 이상 20자 이하여야 합니다."
                        />
                    </div>
                </div>
                <div className="absolute bottom-5 w-[calc(100%-40px)]">
                    {(region === "온라인" || region) && !placeError ? (
                        <Button type="submit">다음</Button>
                    ) : (
                        <Button disabled>다음</Button>
                    )}
                </div>
            </form>
            {isOnOfflineModalOpen && (
                <OnOfflineModal
                    isOpen={isOnOfflineModalOpen}
                    onClose={() => setIsOnOfflineModalOpen(false)}
                />
            )}
            {isRegionModalOpen && (
                <RegionModal
                    isOpen={isRegionModalOpen}
                    onClose={() => setIsRegionModalOpen(false)}
                />
            )}
        </>
    );
}
