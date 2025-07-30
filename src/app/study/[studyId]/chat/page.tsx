import ChattingRoom from "@/components/chatting/ChattingRoom";
import MessageInput from "@/components/chatting/MessageInput";
import SubHeader from "@/components/common/SubHeader";

export default async function page({
    params,
}: {
    params: Promise<{ studyId: string }>;
}) {
    const { studyId } = await params;
    return (
        <div className="h-screen bg-[var(--color-gray200)] dark:bg-[#222]">
            <SubHeader className="bg-[var(--color-gray200)]/85 backdrop-blur-xl dark:bg-[#222]/85">
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
