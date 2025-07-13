import Image from "next/image";
import boy from "../../../public/images/avatarImgs/basic1.png";

export default function AvatarDisplay({ num }: { num: number }) {
    return (
        <>
            {num === 3 && (
                <div className="flex">
                    <Image src={boy} alt="아바타" width={52} height={52} />
                    <Image src={boy} alt="아바타" width={52} height={52} />
                </div>
            )}
        </>
    );
}
