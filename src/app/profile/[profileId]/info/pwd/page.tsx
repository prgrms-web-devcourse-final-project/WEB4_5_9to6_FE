import ChangePassword from "@/components/profile/info/ChangePassword";

export default function page() {
    return (
        <>
            <div className="flex justify-center">
                <div className="border-gray200 min-h-screen w-90 border bg-white pb-4">
                    <ChangePassword />
                </div>
            </div>
        </>
    );
}
