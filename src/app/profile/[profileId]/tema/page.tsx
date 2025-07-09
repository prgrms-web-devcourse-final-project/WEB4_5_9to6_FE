import ProfileTemaTabs from "@/components/profile/tema/ProfileTemaTabs";

export default function page() {
    return (
        <>
            <div className="flex justify-center">
                <div className="border-gray200 min-h-screen w-90 border bg-white pb-4">
                    <ProfileTemaTabs />
                </div>
            </div>
        </>
    );
}
