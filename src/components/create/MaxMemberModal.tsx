import Picker from "react-mobile-picker";
import BottomModal from "../common/BottomModal";

export default function MaxMemberModal({
    onClose,
    maxMember,
    setMaxMember,
    isOpen,
}: {
    onClose: () => void;
    maxMember: number;
    setMaxMember: (column: string, member: number) => void;
    isOpen: boolean;
}) {
    return (
        <BottomModal
            title="최대 인원"
            onClose={onClose}
            height="205"
            isOpen={isOpen}
        >
            <Picker
                value={{ number: maxMember }}
                onChange={(value) => {
                    setMaxMember("maxMembers", value.number);
                }}
                height={140}
                itemHeight={40}
                className="custom-picker px-5"
                wheelMode="normal"
            >
                <Picker.Column name="number">
                    {[3, 4, 5, 6, 7].map((num) => (
                        <Picker.Item key={`picker_${num}`} value={num}>
                            {({ selected }) => (
                                <div
                                    className={`text-gray500 dark:text-gray600 h-10 w-full cursor-pointer pt-2 text-center ${selected && "text-gray1000 bg-gray100 dark:bg-gray900 mx-5 rounded-[12px] dark:text-white"}`}
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
