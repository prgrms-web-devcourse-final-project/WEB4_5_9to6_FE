import { X } from "lucide-react";

interface BottomModalProps {
    title: string;
    onClose: () => void;
    children?: React.ReactNode;
    height: string;
}
export default function BottomModal({
    onClose,
    title,
    children,
    height,
}: BottomModalProps) {
    return (
        <>
            <div className="fixed inset-0 z-30 bg-[#000000]/30">
                <div
                    className={`absolute right-[10px] bottom-5 left-[10px] z-50 flex flex-col rounded-3xl bg-[#FFFFFF] py-5 h-[${height}px]`}
                >
                    <div className="flex items-center justify-between">
                        <h3 className="ml-5 text-[var(--color-gray1000)]">
                            {title}
                        </h3>
                        <X
                            className="mr-5 h-6 w-6 cursor-pointer text-[#161616]"
                            onClick={onClose}
                        />
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
}
