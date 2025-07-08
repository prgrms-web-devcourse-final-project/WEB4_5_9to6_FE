import Image from "next/image";
import avatar from "../../../../assets/images/avatar.png";
import { Ghost } from "lucide-react";

export default function page() {
    return (
        <>
            <div className="flex justify-center">
                <div className="bg-gray100 min-h-screen w-90 pb-4">
                    <div className="flex flex-col items-center justify-center gap-5 pt-4 pb-12">
                        <span className="not-only:bg-gray200 relative flex h-26 w-26 items-center justify-center rounded-[40px]">
                            <Image
                                src={avatar}
                                alt="프로필"
                                className="h-15 w-15 object-fill"
                            />
                            <span className="bg-gray700 absolute right-0 bottom-0 flex h-[30px] w-[30px] items-center justify-center rounded-full">
                                <Ghost size={16} className="text-white" />
                            </span>
                        </span>
                        <p className="text-gray1000 text-2xl font-bold">
                            죽음의고양이
                        </p>
                    </div>
                    <div className="border-t-gray300 border-b-gray300 mx-5 flex flex-col border-t border-b">
                        <p className="b2 text-gray1000">내 계정</p>
                    </div>
                    <div className="border-b-gray300 mx-5 flex flex-col border-b">
                        <p className="b2 text-gray1000">내 계정</p>
                    </div>
                    <div className="border-b-gray300 mx-5 flex flex-col border-b">
                        <p className="b2 text-gray1000">내 계정</p>
                    </div>
                </div>
            </div>
        </>
    );
}
