import ChattingRoom from "@/components/chatting/ChattingRoom";
import MessageInput from "@/components/chatting/MessageInput";
import NoticeBox from "@/components/common/NoticeBox";
import SubHeader from "@/components/common/SubHeader";

export default async function chatPage() {
    return (
        <>
            <SubHeader className="bg-[var(--color-gray200)]/85">
                그룹채팅
            </SubHeader>
            <div className="relative h-screen w-full overflow-y-auto bg-[var(--color-gray200)] px-5 pt-22.5 pb-22">
                <div className="fixed inset-x-5 top-15">
                    <NoticeBox
                        date={"07.03"}
                        content="알쏭달쏭 입니다. 오늘은 제가 예비군 예정으로 스터디에 참여하지 못할 것 같아요 주간 미션 올려놓을테니 각자 공부해주세요~~화이팅"
                        className="w-full bg-white"
                    />
                </div>
                <ChattingRoom />
            </div>
            <div className="absolute">
                <MessageInput />
            </div>
        </>
    );
}
