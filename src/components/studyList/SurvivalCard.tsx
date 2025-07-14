import { Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SurvivalStudy({
    category,
    title,
    content,
    startDate,
    member,
}: {
    category: string;
    title: string;
    content: string;
    startDate: string;
    member: string;
}) {
    const router = useRouter();
    return (
        <>
            <div
                className="h-[206px] w-[188px] cursor-pointer rounded-[16px] bg-gradient-to-b from-[#E93D5B] via-[#D32D4A] to-[#BA1A37] px-4 text-white"
                onClick={() => router.push("/survival-study/1")}
            >
                <p className="c2 mt-[17px]">{category}</p>
                <h4 className="mt-3">{title}</h4>
                <p className="c1 mt-1 h-[96px] text-[#FFD0D8]">{content}</p>
                <div className="c1 mb-3 flex h-[29px] w-full items-end justify-between border-t border-[#DE4761] text-[#FFD0D8]">
                    <span>{startDate} 시작</span>
                    <div className="flex items-center">
                        <Users className="h-3 w-3" />
                        <span>{member}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
