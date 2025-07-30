import { getValidAvatar } from "@/utils/studyDataMap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAlarmStore } from "@/stores/alarmStore";
import { readAlarm } from "@/api/alarms";
import { useMutation } from "@tanstack/react-query";

export default function AlertMessage({ alarm }: { alarm: Alarm }) {
    const router = useRouter();
    dayjs.extend(relativeTime);
    dayjs.locale("ko");

    const { mutate: readNotification } = useMutation({
        mutationFn: () => readAlarm(alarm.alarmId),
        onSuccess: () => {
            useAlarmStore.getState().deleteAlarm(alarm.alarmId);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    return (
        <>
            <div className="mx-5 flex w-[90%] py-3">
                <Link
                    href={`/profile/${alarm.senderId}`}
                    className="bg-gray100 dark:bg-gray900 relative mt-1.5 mr-3.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl duration-200 ease-in"
                >
                    <Image
                        src={getValidAvatar(alarm.senderAvatarImage)}
                        alt="avatar"
                        className="h-8 w-8 object-fill p-1"
                        fill
                    />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col pr-1">
                    <p className="c1 text-gray500 dark:text-gray600 duration-200 ease-in">
                        {dayjs(alarm.sentAt).fromNow()}
                    </p>
                    <div className="b2 text-gray1000 dark cursor-pointer leading-tight break-words duration-200 ease-in dark:text-white">
                        {alarm.type === "APPLY" && (
                            <>
                                <span
                                    className="font-semibold"
                                    onClick={() => {
                                        router.push(
                                            `/profile/${alarm.senderId}`,
                                        );
                                    }}
                                >
                                    {alarm.senderNickname}
                                </span>
                                님이{" "}
                            </>
                        )}
                        {!alarm.resultStatus ? (
                            <span
                                onClick={() => {
                                    router.push(
                                        `/study/${alarm.studyId}/manage`,
                                    );
                                    readNotification();
                                }}
                            >
                                {"'"}
                                {alarm.message.slice(
                                    alarm.senderNickname.length + 3,
                                    -15,
                                )}
                                {"'"}에 가입요청을 보냈습니다.
                            </span>
                        ) : alarm.resultStatus === "ACCEPT" ? (
                            <span
                                onClick={() => {
                                    router.push(`/study/${alarm.studyId}`);
                                    readNotification();
                                }}
                            >
                                {alarm.message.slice(4).replace(/\[|\]/g, "'")}
                            </span>
                        ) : (
                            <span
                                onClick={() => {
                                    router.push(
                                        `/study/${alarm.studyId}/recruit`,
                                    );
                                    readNotification();
                                }}
                            >
                                {alarm.message.slice(4).replace(/\[|\]/g, "'")}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
