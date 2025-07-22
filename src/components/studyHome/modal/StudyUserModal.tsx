// import { X } from "lucide-react";
import BottomModal from "@/components/common/BottomModal";
import StudyUsers from "@/components/studyRecruit/StudyUsers";

export default function StudyHomeUser({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <>
            <BottomModal
                title="스터디원"
                onClose={onClose}
                height="479"
                isOpen={isOpen}
            >
                <div className="mt-1">
                    <StudyUsers />
                </div>
            </BottomModal>
        </>
    );
}
