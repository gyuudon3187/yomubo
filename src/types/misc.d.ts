import type { ComputedRef, Ref } from "vue";
import { Stage } from "@/components/util";

export interface InputComponentGroup {
    label?: string,
    components: InputComponent[]
}

export type InputComponent =    InputFieldInterface | 
                                RadioButtonInterface | 
                                MultiselectDropdownInterface | 
                                DatePickerInterface |
                                LocationPickerInterface |
                                TextAreaInterface

export interface InputFieldInterface extends HasId, HasLabel, HasValidation {
    __typename: "InputFieldInterface",
    input: Ref<string>,
    password?: boolean,
}

export interface RadioButtonInterface extends HasId, HasLabel, HasValidation {
    __typename: "RadioButtonInterface",
    buttons: string[],
    input: Ref<string>,
    checkedIndex?: number
}

export interface MultiselectDropdownInterface extends HasId, HasLabel, HasValidation {
    __typename: "MultiselectDropdownInterface",
    options: Option[],
    input: Ref<string[]>,
    placeholderPath: string
}

export interface DatePickerInterface extends HasId, HasLabel {
    __typename: "DatePickerInterface",
    data: Ref<Date>
}

export interface LocationPickerInterface extends HasId, HasLabel {
    __typename: "LocationPickerInterface",
    data: Ref<string>
}

export interface AccordionItem extends HasLabel {
    data?: any,
    selected: boolean,
    subItems: AccordionSubItem[]
}

export interface TextAreaInterface extends HasId {
    __typename: "TextAreaInterface",
    rows: number,
    columns: number,
    input: Ref<string>,
    disabled?: boolean,
    maxChars?: number,
    label?: string
}

interface AccordionSubItem extends HasLabel {
    icon: string,
    value: string
}

export interface Club extends HasLabel {
    clubOwner: string,
    readingList: BookCandidate[],
    members: Member[],
    meetings: Meeting[],
    maxMemberCount: number,
    language: Language,
    meeting: MeetingType,
    pace: number,
    gender: Gender,
    genre: string
}

export interface Meeting {
    type: string,
    date: string,
    votingDeadline: string,
    location: string,
    currentlyReading: string,
    votes: Votes
    stage: Stage.Start | Stage.Voting | Stage.Reading | Stage.Discussing
}

interface Votes {
    [uid: string]: string
}

type Language = string

interface Member {
    id: string,
    name: string,
    pfp: string
}

type MeetingType = "Online" | "Physical"

type Gender = "Male" | "Female" | "All"

export interface Option extends HasLabel {
    selected: Ref<boolean>,
    isVisible?: Ref<boolean>
}

export interface ValidationGroup {
    validations: Validation[],
    displayMessage: Ref<string>,
    error: Ref<boolean>,
    dirty: Ref<boolean>
}

export interface Validation {
    validator: Function,
    message: string,
    error?: Ref<boolean>,
    dirty?: Ref<boolean>,
    params?: any
}

interface HasId {
    id: string | undefined
}

interface HasLabel {
    label: string
}

interface HasValidation {
    validation?: ValidationGroup
}

export interface ButtonInterface {
    id: string,
    text: string,
    type: ButtonTypes,
    callback: Function,
    active?: Ref<boolean> | undefined
}

type ButtonTypes = "primary" | "secondary" | "tertiary" | "quaternary" | "negative"

export interface Book {
    id: string,
    image: string,
    title: string,
    synopsis: string,
    authors: string,
    pages: number
}

export interface BookCandidate extends Book {
    selected: boolean,
    voted: boolean,
    addedBy: string,
    reason: string,
}