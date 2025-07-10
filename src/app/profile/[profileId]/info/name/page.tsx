import ChangeNickname from "@/components/profile/info/ChangeNickname";

export default function page() {
    return (
        <>
            <div className="flex justify-center pt-15.5">
                <div className="h-[calc(100vh-134px)] w-screen overflow-hidden bg-white pb-4">
                    <ChangeNickname />
                </div>
            </div>
        </>
    );
}
