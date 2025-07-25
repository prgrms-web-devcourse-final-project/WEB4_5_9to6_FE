// import { X } from "lucide-react";
import { useState } from "react";
import StudyUsers from "../studyRecruit/StudyUsers";
import StudyApplicant from "./StudyApplicant";
import BottomModal from "../common/BottomModal";
import ChannelSlideBar from "../common/ChannelSlideBar";

export default function MemberModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const users = [
        "삼성동오징어(나)",
        "대장동꼴뚜기",
        "미금역비둘기",
        "상봉동 오리아나",
        "역병괴수",
        "우라늄아이스크림",
    ];
    const applicant = [
        {
            name: "뒷덜미욱신욱신1",
            message:
                "당장 수락하지 않으면 감안안도입니다. 내가  얼마나 넥스트를 공부하고싶은데 니가 내 맘 을 알아?",
        },
        { name: "뒷덜미욱신욱신2", message: "날 받아라2." },
        { name: "뒷덜미욱신욱신3", message: "날 받아라3." },
    ];
    const channels = [
        `팀원목록 ${users.length}`,
        `신청목록 ${applicant.length}`,
    ];
    const [channel, setChannel] = useState(`팀원목록 ${users.length}`);

    return (
        <>
            <BottomModal
                title="스터디원"
                onClose={onClose}
                height="507"
                isOpen={isOpen}
            >
                <div className="mt-7 flex flex-col">
                    <ChannelSlideBar
                        channels={channels}
                        channel={channel}
                        setChannel={setChannel}
                    />
                </div>
                <div className="hide-scrollbar overflow-y-auto">
                    {channel === channels[0] ? (
                        <StudyUsers />
                    ) : (
                        <StudyApplicant applicant={applicant} />
                    )}
                </div>
            </BottomModal>
        </>
    );
}
