import { create } from "zustand";
import { fetchMemeberPage, fetchMemeberInfo } from "@/api/members";
import { fetchStudyList } from "@/api/studyList";

interface ProfileStore {
    data: MemberProfile | null;
    data2: MemberInfoType | null;
    data3: MemberStudyList[] | null;
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

            set({
                data: res.data,
                data2: res2.data,
                data3: res3.studies,
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
