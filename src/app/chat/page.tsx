import NoticeBox from "@/components/common/NoticeBox";
import SubHeader from "@/components/common/SubHeader";

export default async function chatPage() {
    return (
        <>
            <SubHeader className="bg-[var(--color-gray200)]/85">
                그룹채팅
            </SubHeader>
            <div className="h-screen bg-[var(--color-gray200)] px-4">
                <NoticeBox />
            </div>
        </>
    );
}
