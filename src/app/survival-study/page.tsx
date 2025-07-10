import BackButton from "@/components/common/BackButton";
import NoticeBox from "@/components/common/NoticeBox";
import Image from "next/image";

export default async function SurvivalStudy() {
    return (
        <>
            <div className="relative">
                <Image
                    src="/images/roomImgs/room7.png"
                    alt="survival study"
                    width={1000}
                    height={470}
                    style={{
                        width: "100%",
                        maxHeight: "500px",
                    }}
                />
                <div className="absolute top-4 left-4">
                    <BackButton />
                </div>
                <NoticeBox />
            </div>
        </>
    );
}
