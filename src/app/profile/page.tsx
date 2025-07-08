import ProfileCard from "@/components/profile/ProfileCard";
import ProfileTabs from "@/components/profile/ProfileTabs";

export default function page() {
    return (
        <>
            <div className="bg-gray100 min-h-screen w-90 pb-4">
                <ProfileCard />
                <ProfileTabs />
            </div>
        </>
    );
}
