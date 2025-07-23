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
        <>
            <SubHeader className="bg-[var(--color-gray200)]/85">
                그룹채팅
            </SubHeader>
            <div className="relative h-screen w-full overflow-y-auto bg-[var(--color-gray200)] px-5 pt-4 pb-22">
                <ChattingRoom studyId={studyId} />
            </div>
            <div className="absolute">
                <MessageInput studyId={studyId} />
            </div>
        </>
    );
}
