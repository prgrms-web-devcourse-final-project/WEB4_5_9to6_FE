import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function loading() {
    return (
        <>
            <div className="bg-gray100 h-screen w-full">
                <LoadingSpinner />
            </div>
        </>
    );
}
