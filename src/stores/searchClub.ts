import { Stage } from "@/components/util";
import type { AccordionItem, Club } from "@/types/misc";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

type Rename<T, K extends keyof T, N extends string> = Pick<T, Exclude<keyof T, K>> & { [P in N]: T[K] };
type Modify<T, R> = Omit<T, keyof R> & R;
type SearchResults = Rename<
                        Rename<
                            Pick<AccordionItem, "data" | "subItems">, 
                        "data", "club">, 
                    "subItems", "details">

export const useSearchClubStore = defineStore("searchClubStore", () => {
    const clubs: Ref<Club[]> = ref([{
        label: "Test3",
        clubOwner: "TestUser2",
        members: [
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
                bookReport: null,
                quotes: [],
                votes: {},
                stage: Stage.Voting
            }
        ],
        maxMemberCount: 8,
        language: "Japanese",
        meetingType: "Physical",
        pace: 230,
        gender: "All",
        genre: "Mystery",
        settings: {
            banner: "",
            introduction: "sla feugiat, vehicula lorem eu, venenatis ligula. Donec purus turpis, volutpat a tellus ac, porta dictum velit. Pellentesque et ipsum at nibh luctus condimentum. Sed sed lorem non leo cursus tempor. Phasellus ex leo, suscipit ut iaculis in, tristique eget est. Sed accumsan felis est, ac fringilla mi congue quis. Nunc aliquet risus eget ex placerat, nec fermentum purus lobortis."
        }
    },
    {
        label: "Test2",
        clubOwner: "uTLPdMdT61UvUxAkxVw4p1jcYRg2",
        members: [
            {
                id: "f",
                name: "Bob",
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
                bookReport: null,
                quotes: [],
                votes: {},
                stage: Stage.Start
            }
        ],
        maxMemberCount: 8,
        language: "Japanese",
        meetingType: "Physical",
        pace: 230,
        gender: "All",
        genre: "Mystery",
        settings: {
            banner: "",
            introduction: "Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet"
        }
    }]);
    const searchResults = ref(<AccordionItem[]>[]);

    return { clubs, searchResults };
})