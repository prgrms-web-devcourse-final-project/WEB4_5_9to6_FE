import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { ChevronDown } from "lucide-react";
import OnOfflineModal from "./OnOfflineModal";
import RegionModal from "./RegionModal";
import { translateRegionToEnum } from "@/utils/translateRegionToEnum";

export default function Step3({
    continueStep,
    requestRegion,
    requestPlace,
}: {
    continueStep: () => void;
    requestRegion: (region: string) => void;
    requestPlace: (place: string) => void;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [onOff, setOnOff] = useState("");
    const [region, setRegion] = useState("");
    const [place, setPlace] = useState("");
    const [placeError, setPlaceError] = useState(false);
    const [isOnOfflineModalOpen, setIsOnOfflineModalOpen] = useState(false);
    const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!((onOff === "온라인" || region) && !placeError)) return;

        requestRegion(translateRegionToEnum(region));
        requestPlace(place);
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
                            value={onOff}
                            label="온/오프라인"
                            onClick={() => setIsOnOfflineModalOpen(true)}
                            className="cursor-pointer"
                            icon={<ChevronDown strokeWidth={1} size={20} />}
                            readOnly
                        />
                    </div>
                    <div
                        className={`duration-1000 ease-out ${onOff !== "오프라인" && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="지역 선택"
                            value={region}
                            label="지역"
                            onClick={() => setIsRegionModalOpen(true)}
                            className="cursor-pointer"
                            icon={<ChevronDown strokeWidth={1} size={20} />}
                            readOnly
                        />
                    </div>
                    <div
                        className={`delay-200 duration-1000 ease-out ${onOff !== "오프라인" && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="상세 장소 입력"
                            label="상세 장소 (선택)"
                            value={place}
                            onChange={(e) =>
                                setPlace(e.target.value.replace(/^\s+/, ""))
                            }
                            error={placeError}
                            errorMsg="상세 장소는 2자 이상 20자 이하여야 합니다."
                        />
                    </div>
                </div>
                <div className="absolute bottom-5 w-[calc(100%-40px)]">
                    {(onOff === "온라인" || region) && !placeError ? (
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
                    onOff={onOff}
                    setOnOff={setOnOff}
                    setRegion={setRegion}
                    setPlaceNull={() => setPlace("")}
                />
            )}
            {isRegionModalOpen && (
                <RegionModal
                    isOpen={isRegionModalOpen}
                    onClose={() => setIsRegionModalOpen(false)}
                    region={region}
                    setRegion={setRegion}
                />
            )}
        </>
    );
}
