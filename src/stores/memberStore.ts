import { create } from "zustand";
import { fetchMemeberPage, fetchMemeberInfo } from "@/api/members";
import { fetchStudyList } from "@/api/studyList";
import { fetchLeaderAvatar } from "@/api/fetchUser";

type StudyCardWithAvatar = StudyInfo & {
    leaderAvatar: string | null;
};

interface ProfileStore {
    data: MemberProfile | null;
    data2: MemberInfoType | null;
    data3: StudyCardWithAvatar[] | null;
    memberId: number;
    loading: boolean;
    fetch: (id: number) => Promise<void>;
    reset: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
    data: null,
    data2: null,
    data3: null,
    memberId: 0,
    loading: false,
    error: null,

    fetch: async (id: number) => {
        set({ loading: true });
        try {
            const res = await fetchMemeberPage(id);
            const res2 = await fetchMemeberInfo(id);
            const res3 = await fetchStudyList(id);

            const memberId = res3.memberId;

            const avatarList = await Promise.all(
                res3.studies.map((study: StudyCardWithAvatar) => {
                    return fetchLeaderAvatar(study.studyId);
                }),
            );

            const studyList = res3.studies.map(
                (study: StudyCardWithAvatar, i: number) => ({
                    ...study,
                    leaderAvatar: avatarList[i],
                }),
            );

            set({
                data: res.data,
                data2: res2.data,
                data3: studyList,
                memberId: memberId,
                loading: false,
            });
        } catch (e) {
            console.error(e);
        }
    },

    reset: () =>
        set({
            data: null,
            data2: null,
            data3: null,
            memberId: 0,
            loading: false,
        }),
}));
