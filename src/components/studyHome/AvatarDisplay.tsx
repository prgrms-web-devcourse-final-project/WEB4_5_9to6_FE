import Image from "next/image";
import boy from "../../../public/images/rewardItems/61.png";

export default function AvatarDisplay({ num }: { num: number }) {
    return (
        <>
            {num >= 3 && (
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3">
                        <Image src={boy} alt="아바타" width={52} height={52} />
                        <Image src={boy} alt="아바타" width={52} height={52} />
                        {num >= 5 && (
                            <Image
                                src={boy}
                                alt="아바타"
                                width={52}
                                height={52}
                            />
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <Image
                            src={boy}
                            alt="아바타"
                            width={52}
                            height={52}
                            className="ml-[34px]"
                        />
                        {num >= 4 && (
                            <Image
                                src={boy}
                                alt="아바타"
                                width={52}
                                height={52}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
