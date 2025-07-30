import SubHeader from "@/components/common/SubHeader";
import ChangePassword from "@/components/profile/info/ChangePassword";

export default async function page({
    params,
}: {
    params: Promise<{ profileId: string }>;
}) {
    const { profileId } = await params;
    return (
        <>
            <SubHeader>비밀번호 변경</SubHeader>
            <div className="flex justify-center bg-white pt-15.5 dark:bg-[#222222]">
                <div className="h-[calc(100vh-62px)] w-screen overflow-hidden pb-4">
                    <ChangePassword id={profileId} />
                </div>
            </div>
        </>
    );
}
