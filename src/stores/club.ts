import type { BookCandidate, Club } from "@/types/misc";
import { defineStore } from "pinia"; 
import { ref, watch, computed, type Ref } from "vue";
import { useAuthStore } from "./auth";
import { Stage } from "@/components/util";

export const useClubStore = defineStore('clubStore', () => {
    const { uid } = useAuthStore();

    const clubs: Ref<Club[]> = ref([{
        label: "Test",
        clubOwner: "TestUser2",
        members: [
            {
                id: "uTLPdMdT61UvUxAkxVw4p1jcYRg2",
                name: "Daniel",
                pfp: ""
            },
            {
                id: "a",
                name: "Fredric",
                pfp: ""
            },
            {
                id: "b",
                name: "Sophia",
                pfp: ""
            },
            {
                id: "c",
                name: "Gustav",
                pfp: ""
            },
            {
                id: "d",
                name: "Xavier",
                pfp: ""
            }
        ],
        readingList: [
            {
                id: "a",
                title: "Kyokousendan",
                pages: 592,
                image: "src/assets/kagami_no_kojou.png",
                synopsis: "test 1",
                authors: "test author 1",
                reason: "",
                selected: false,
                voted: false,
                addedBy: "uTLPdMdT61UvUxAkxVw4p1jcYRg2"
            }
        ],
        meetings: [
            {
                type: "Online",
                date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toJSON(),
                votingDeadline: new Date(new Date().getTime() + 1000 * 60 * 60).toJSON(),
                location: "Café Blåbär",
                currentlyReading: "",
                votes: {},
                stage: Stage.Voting
            }
        ],
        maxMemberCount: 8,
        language: "Japanese",
        meeting: "Physical",
        pace: 230,
        gender: "All",
        genre: "Mystery"
    },
    {
        label: "Test2",
        clubOwner: "uTLPdMdT61UvUxAkxVw4p1jcYRg2",
        members: [
            {
                id: "uTLPdMdT61UvUxAkxVw4p1jcYRg2",
                name: "Daniel",
                pfp: ""
            }
        ],
        readingList: [
            {
                id: "b",
                title: "Kagami no Kojou",
                pages: 415,
                image: "src/assets/kagami_no_kojou.png",
                synopsis: "test 2",
                authors: "test author 2",
                reason: "",
                selected: false,
                voted: false,
                addedBy: "TestUser2"
            }
        ],
        meetings: [
            {
                type: "Physical",
                date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toJSON(),
                votingDeadline: new Date(new Date().getTime() + 1000 * 60 * 60).toJSON(),
                location: "",
                currentlyReading: "",
                votes: {},
                stage: Stage.Voting
            }
        ],
        maxMemberCount: 8,
        language: "Japanese",
        meeting: "Physical",
        pace: 230,
        gender: "All",
        genre: "Mystery"
    }]);
    
    const selectedClub: Ref<Club> = ref(clubs.value[0]);
    const isClubOwner = computed(() => selectedClub.value.clubOwner === uid)
    const currentMeeting = computed(() => selectedClub.value.meetings.slice(-1)[0]);
    const currentMeetingIndex = computed(() => selectedClub.value.meetings.lastIndexOf(currentMeeting.value))
    const currentVotes = computed(() => currentMeeting.value.votes)
    const currentStage = computed(() => currentMeeting.value.stage);
    const selectedBookIndex = ref(0);
    const bookToBeEdited: Ref<BookCandidate | null> = ref(null);

    function isInStage(stage: Stage.Start | Stage.Voting | Stage.Reading | Stage.Discussing) {
        return currentStage.value === stage;
    }
    
    function removeFromReadingList(book: BookCandidate): void {
        selectedClub.value = Object.assign(selectedClub.value, {
            readingList: selectedClub.value.readingList.filter(otherBook => otherBook.id !== book.id)
        })
    }

    function updateCurrentMeeting(key: string, value: any) {
        selectedClub.value = { 
            ...selectedClub.value, 
            meetings: [ 
                ...selectedClub.value.meetings.slice(0, selectedClub.value.meetings.length - 2),
                { ...currentMeeting.value, [key]: value }
            ] 
        }
    }

    return { 
        clubs, 
        selectedClub, 
        isClubOwner, 
        currentMeeting, 
        currentMeetingIndex, 
        currentVotes, 
        selectedBookIndex,
        bookToBeEdited,
        isInStage,
        removeFromReadingList,
        updateCurrentMeeting }
})