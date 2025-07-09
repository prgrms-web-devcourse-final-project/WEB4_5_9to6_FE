import Banner from "@/components/Banner";
import StudyTime from "@/components/StudyTime";

export default async function Main() {
    return (
        <>
            <div className="min-h-screen bg-[var(--color-gray100)] px-5 pt-16">
                <Banner />
                <StudyTime />
            </div>
        </>
    );
}
