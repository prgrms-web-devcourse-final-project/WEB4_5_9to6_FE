import ProfileTemaTabs from "@/components/profile/tema/ProfileTemaTabs";

export default function page() {
    return (
        <>
            <div className="flex h-screen items-center justify-center pt-15.5">
                <div className="border-gray200 h-full w-90 overflow-hidden border bg-white">
                    <ProfileTemaTabs />
                </div>
            </div>
        </>
    );
}
