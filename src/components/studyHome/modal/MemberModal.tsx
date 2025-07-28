// import { X } from "lucide-react";
import { useState } from "react";
import StudyUsers from "../../studyRecruit/StudyUsers";
import StudyApplicant from "../StudyApplicant";
import BottomModal from "../../common/BottomModal";
import ChannelSlideBar from "../../common/ChannelSlideBar";

export default function MemberModal({
    isOpen,
    onClose,
    maxMembers,
}: {
    isOpen: boolean;
    onClose: () => void;
    maxMembers: number;
}) {
    const channels = [`팀원목록`, `신청목록`];
    const [channel, setChannel] = useState(`팀원목록`);
    // const params = useParams();
    // const id = params?.studyId;
    // const studyId = typeof id === "string" ? parseInt(id) : null;

    // const { data: userDatas } = useQuery({
    //     queryKey: ["applicantsModal", studyId],
    //     queryFn: async () => {
    //         if (!studyId) throw new Error("스터디 아이디가 없습니다");
    //         return await getApplicants(studyId);
    //     },
    //     enabled: !!studyId,
    // });

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
                        <StudyApplicant
                            // applicants={userDatas ?? []}
                            maxMembers={maxMembers}
                        />
                    )}
                </div>
            </BottomModal>
        </>
    );
}
