// import { X } from "lucide-react";
import StudyUsers from "../studyRecruit/StudyUsers";
import BottomModal from "../common/BottomModal";

export default function StudyHomeUser({ onClose }: { onClose: () => void }) {
    return (
        <>
            <BottomModal title="스터디원" onClose={onClose} height="479">
                <div className="mt-1">
                    <StudyUsers />
                </div>
            </BottomModal>
        </>
    );
}
