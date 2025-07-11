import Banner from "@/components/Banner";
import Gnb from "@/components/common/Gnb";
import Header from "@/components/common/Header";
import StudyTime from "@/components/StudyTime";

export default async function Main() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-[var(--color-gray100)] px-5 pt-16">
                <Banner />
                <StudyTime avatar="" />
            </div>
            <Gnb />
        </>
    );
}
