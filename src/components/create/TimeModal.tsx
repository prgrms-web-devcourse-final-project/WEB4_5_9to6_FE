import Picker from "react-mobile-picker";
import BottomModal from "../common/BottomModal";

interface TimeModalProps {
    title: string;
    onClose: () => void;
    time: string;
    setTime: (value: string) => void;
}

export default function TimeModal({
    title,
    onClose,
    time,
    setTime,
}: TimeModalProps) {
    const [hour, minute] = time.split(":");

    return (
        <BottomModal title={title} onClose={onClose} height="295">
            <div className="absolute top-35.5 left-10 h-[40px] w-[calc(100%-80px)] rounded-[8px] bg-[var(--color-gray100)]"></div>
            <Picker
                value={{ hour, minute }}
                onChange={(value) => setTime(`${value.hour}:${value.minute}`)}
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
                                        className={`ml-5 h-6 w-full cursor-pointer text-center text-[var(--color-gray500)] ${selected && "font-medium text-[var(--color-gray1000)]"}`}
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
                                    className={`mr-5 h-6 w-full cursor-pointer text-center text-[var(--color-gray500)] ${selected && "font-medium text-[var(--color-gray1000)]"}`}
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
