export default function LoadingSpinner() {
    return (
        <>
            <div className="flex h-full items-center justify-center">
                <div className="border-t-main500 border-gray500 h-10 w-10 animate-spin rounded-full border-4"></div>
            </div>
        </>
    );
}
