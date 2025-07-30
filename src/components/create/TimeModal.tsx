import Picker from "react-mobile-picker";
import BottomModal from "../common/BottomModal";
import { useStudyStore } from "@/stores/studyStore";

interface TimeModalProps {
    title: string;
    onClose: () => void;
    time: string;
    type: string;
    isOpen: boolean;
}

export default function TimeModal({
    title,
    onClose,
    time,
    type,
    isOpen,
}: TimeModalProps) {
    const [hour, minute] = time.split(":");

    return (
        <BottomModal
            title={title}
            onClose={onClose}
            height="295"
            isOpen={isOpen}
        >
            <div className="dark:bg-gray900 bg-gray100 absolute top-35.5 left-10 h-[40px] w-[calc(100%-80px)] rounded-[8px]"></div>
            <Picker
                value={{ hour, minute }}
                onChange={(value) =>
                    useStudyStore
                        .getState()
                        .setData(type, `${value.hour}:${value.minute}`)
                }
                height={240}
                itemHeight={40}
                className="custom-picker px-5"
                wheelMode="normal"
            >
                <Picker.Column name="hour">
                    {Array.from({ length: 24 }).map((_, i) => {
                        const value = i.toString().padStart(2, "0");
                        return (
                            <Picker.Item key={value} value={value}>
                                {({ selected }) => (
                                    <div
                                        className={`text-gray500 dark:text-gray600 ml-5 h-6 w-full cursor-pointer text-center ${selected && "text-gray1000 font-medium dark:text-white"}`}
                                    >
                                        {value}시
                                    </div>
                                )}
                            </Picker.Item>
                        );
                    })}
                </Picker.Column>
                <Picker.Column name="minute">
                    {[
                        "00",
                        "05",
                        "10",
                        "15",
                        "20",
                        "25",
                        "30",
                        "35",
                        "40",
                        "45",
                        "50",
                        "55",
                    ].map((m) => (
                        <Picker.Item key={`picker_${m}`} value={m}>
                            {({ selected }) => (
                                <div
                                    className={`text-gray500 dark:text-gray600 mr-5 h-6 w-full cursor-pointer text-center ${selected && "text-gray1000 font-medium dark:text-white"}`}
                                >
                                    {m}분
                                </div>
                            )}
                        </Picker.Item>
                    ))}
                </Picker.Column>
            </Picker>
        </BottomModal>
    );
}
