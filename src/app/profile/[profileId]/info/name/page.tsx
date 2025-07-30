import SubHeader from "@/components/common/SubHeader";
import ChangeNickname from "@/components/profile/info/ChangeNickname";

export default async function page({
    params,
}: {
    params: Promise<{ profileId: string }>;
}) {
    const { profileId } = await params;
    return (
        <>
            <SubHeader>닉네임 변경</SubHeader>
            <div className="flex justify-center pt-15.5">
                <div className="h-[calc(100vh-72px)] w-screen overflow-hidden bg-white pb-4 dark:bg-[#222222]">
                    <ChangeNickname id={profileId} />
                </div>
            </div>
        </>
    );
}
