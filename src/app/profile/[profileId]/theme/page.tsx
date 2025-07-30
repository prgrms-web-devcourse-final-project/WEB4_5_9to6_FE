import SubHeader from "@/components/common/SubHeader";
import ProfileTemaTabs from "@/components/profile/theme/ProfileTemaTabs";

export default async function page({
    params,
}: {
    params: Promise<{ profileId: string }>;
}) {
    const { profileId } = await params;
    return (
        <>
            <SubHeader>테마 변경</SubHeader>
            <div className="flex h-screen items-center justify-center bg-white pt-15.5 dark:bg-[#222222]">
                <div className="h-full w-screen overflow-hidden">
                    <ProfileTemaTabs id={profileId} />
                </div>
            </div>
        </>
    );
}
