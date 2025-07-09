import MyStudyModal from "@/components/profile/MyStudyModal";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileTabs from "@/components/profile/ProfileTabs";

export default async function page({
    params,
}: {
    params: Promise<{ profileId: string }>;
}) {
    const { profileId } = await params;
    console.log(profileId);

    return (
        <>
            <div className="flex h-screen items-center justify-center pt-15.5">
                <div className="bg-gray100 h-full w-screen overflow-hidden pb-4">
                    <ProfileCard />
                    <ProfileTabs />
                    <MyStudyModal />
                </div>
            </div>
        </>
    );
}
