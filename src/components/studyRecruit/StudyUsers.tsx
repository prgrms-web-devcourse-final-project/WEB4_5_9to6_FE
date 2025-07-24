import { studyMembers } from "@/api/studies";
import avatar from "../../../public/images/rewardItems/61.png";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function StudyUsers() {
    // const users = [
    //     "삼성동오징어(나)",
    //     "대장동꼴뚜기",
    //     "미금역비둘기",
    //     "상봉동 오리아나",
    //     "역병괴수",
    //     "우라늄아이스크림",
    // ];
    const router = useRouter();
    const params = useParams();
    const [members, setMembers] = useState<Members[]>([]);
    useEffect(() => {
        const fetchMembers = async () => {
            const id = params?.studyId;
            if (typeof id === "string") {
                try {
                    const data: Members[] = await studyMembers(parseInt(id));
                    setMembers(data);
                } catch (err) {
                    console.error("팀원현황 불러오기 실패", err);
                }
            }
        };
        fetchMembers();
    }, [params?.studyId]);
    return (
        <>
            <div className="mt-6 px-5">
                <p className="c1 text-[var(--color-gray1000)]">
                    총 {members.length}명
                </p>
                <div className="mt-4 flex flex-col gap-[12px]">
                    {members.map((member) => (
                        <div
                            key={member.studyMemberId}
                            className="flex h-12 w-full items-center justify-between"
                        >
                            <div className="flex items-center">
                                <div
                                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-[16px] bg-[var(--color-gray100)]"
                                    onClick={() => router.push("/profile/info")}
                                >
                                    <Image
                                        src={
                                            member.profileImage
                                                ? member.profileImage
                                                : avatar
                                        }
                                        alt="아바타"
                                        height={32}
                                        width={32}
                                    />
                                </div>
                                <h6 className="ml-[12px] flex items-center text-[var(--color-gray1000)]">
                                    {member.nickName}
                                </h6>
                            </div>
                            {/* <span className="c1 flex items-center text-[#FF395C]">
                                스터디중
                            </span> */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
