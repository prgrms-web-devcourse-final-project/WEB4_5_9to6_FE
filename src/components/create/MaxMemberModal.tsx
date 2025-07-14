import Picker from "react-mobile-picker";
import BottomModal from "../common/BottomModal";

export default function MaxMemberModal({
    onClose,
    maxMember,
    setMaxMember,
}: {
    onClose: () => void;
    maxMember: string;
    setMaxMember: (value: string) => void;
}) {
    return (
        <BottomModal title="최대 인원" onClose={onClose} height="205">
            <Picker
                value={{ number: maxMember }}
                onChange={(value) => {
                    setMaxMember(value.number);
                }}
                height={140}
                itemHeight={40}
                className="custom-picker px-5"
                wheelMode="normal"
            >
                <Picker.Column name="number">
                    {["3", "4", "5", "6", "7"].map((num) => (
                        <Picker.Item key={`picker_${num}`} value={num}>
                            {({ selected }) => (
                                <div
                                    className={`h-10 w-full cursor-pointer pt-2 text-center text-[var(--color-gray500)] ${selected && "mx-5 rounded-[12px] bg-[var(--color-gray100)] text-[var(--color-gray1000)]"}`}
                                >
                                    {num}
                                </div>
                            )}
                        </Picker.Item>
                    ))}
                </Picker.Column>
            </Picker>
        </BottomModal>
    );
}
