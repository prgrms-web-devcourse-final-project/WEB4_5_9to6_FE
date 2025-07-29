import Image from "next/image";
import defaultImg from "../../../public/images/rewardItems/61.png";

export default function AvatarDisplay({
    num,
    membersData,
}: {
    num: number;
    membersData: StudyMember[];
}) {
    console.log("아바타 개수", num, membersData);
    return (
        <>
            {(num === 1 ||
                num === 2 ||
                num === 3 ||
                num === 5 ||
                num === 7) && (
                <div className="flex flex-col justify-center">
                    {/* 세번째줄 */}
                    {num >= 7 && (
                        <div className="flex items-center gap-3">
                            <Image
                                src={membersData[5]?.profileImage || defaultImg}
                                alt="아바타"
                                width={52}
                                height={52}
                                className="ml-[34px]"
                            />

                            <Image
                                src={membersData[6]?.profileImage || defaultImg}
                                alt="아바타"
                                width={52}
                                height={52}
                            />
                        </div>
                    )}
                    {/* 두번째줄 */}
                    <div className="flex items-center gap-3">
                        <Image
                            src={membersData[0]?.profileImage || defaultImg}
                            alt="아바타"
                            width={52}
                            height={52}
                        />
                        {num >= 2 && (
                            <Image
                                src={membersData[1]?.profileImage || defaultImg}
                                alt="아바타"
                                width={52}
                                height={52}
                            />
                        )}
                        {num >= 5 && (
                            <Image
                                src={membersData[4]?.profileImage || defaultImg}
                                alt="아바타"
                                width={52}
                                height={52}
                            />
                        )}
                    </div>
                    {/* 첫번째줄 */}
                    <div className="flex items-center gap-3">
                        {num >= 3 && (
                            <Image
                                src={membersData[2]?.profileImage || defaultImg}
                                alt="아바타"
                                width={52}
                                height={52}
                                className="ml-[34px]"
                            />
                        )}
                        {num >= 5 && (
                            <Image
                                src={membersData[3]?.profileImage || defaultImg}
                                alt="아바타"
                                width={52}
                                height={52}
                            />
                        )}
                    </div>
                </div>
            )}

            {(num === 4 || num === 6) && (
                <div className="flex flex-col justify-center">
                    {/* 세번째줄 */}
                    <div className="flex items-center gap-3">
                        <Image
                            src={membersData[2]?.profileImage || defaultImg}
                            alt="아바타"
                            width={52}
                            height={52}
                        />

                        <Image
                            src={membersData[3]?.profileImage || defaultImg}
                            alt="아바타"
                            width={52}
                            height={52}
                        />
                        {num >= 6 && (
                            <Image
                                src={membersData[5]?.profileImage || defaultImg}
                                alt="아바타"
                                width={52}
                                height={52}
                            />
                        )}
                    </div>
                    {/* 두번째줄 */}
                    <div className="flex items-center gap-3">
                        <Image
                            src={membersData[1]?.profileImage || defaultImg}
                            alt="아바타"
                            width={52}
                            height={52}
                        />

                        <Image
                            src={membersData[0]?.profileImage || defaultImg}
                            alt="아바타"
                            width={52}
                            height={52}
                        />

                        {num >= 6 && (
                            <Image
                                src={membersData[4]?.profileImage || defaultImg}
                                alt="아바타"
                                width={52}
                                height={52}
                            />
                        )}
                    </div>

                    {/* 첫번째줄
                    {num >= 8 && (
                        <div className="flex items-center gap-3">
                            <Image
                                src={membersData[6]?.profileImage || defaultImg}
                                alt="아바타"
                                width={52}
                                height={52}
                                className={`${num === 8 ? "ml-[34px]" : ""}`}
                            />

                            <Image
                                src={membersData[7]?.profileImage || defaultImg}
                                alt="아바타"
                                width={52}
                                height={52}
                            />
                            {num === 9 && (
                                <Image
                                    src={
                                        membersData[8]?.profileImage ||
                                        defaultImg
                                    }
                                    alt="아바타"
                                    width={52}
                                    height={52}
                                />
                            )}
                        </div>
                    )} */}
                </div>
            )}
        </>
    );
}
