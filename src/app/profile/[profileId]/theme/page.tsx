import ProfileTemaTabs from "@/components/profile/theme/ProfileTemaTabs";

export default function page() {
    return (
        <>
            <div className="flex h-screen items-center justify-center pt-15.5">
                <div className="h-full w-screen overflow-hidden bg-white">
                    <ProfileTemaTabs />
                </div>
            </div>
        </>
    );
}
