import ChattingRoom from "@/components/chatting/ChattingRoom";
import MessageInput from "@/components/chatting/MessageInput";
import SubHeader from "@/components/common/SubHeader";

export default async function chatPage({
    params,
}: {
    params: { studyId: string };
}) {
    const studyId = Number(params.studyId);
    return (
        <div className="h-screen bg-[var(--color-gray200)]">
            <SubHeader className="bg-[var(--color-gray200)]/85">
                그룹채팅
            </SubHeader>
            <div className="relative mb-20 w-full overflow-y-auto pt-4">
                <ChattingRoom studyId={studyId} />
            </div>
            <div className="absolute">
                <MessageInput studyId={studyId} />
            </div>
        </div>
    );
}
