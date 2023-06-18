import type { Ref } from "vue";

export interface InputComponentGroup extends HasLabel {
    components: InputComponent[]
}

export type InputComponent = InputFieldInterface | RadioButtonInterface | MultiselectDropdownInterface

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

export interface AccordionItem extends HasLabel {
    selected: Ref<Boolean>,
    subItems: AccordionSubItem[]
}

interface AccordionSubItem extends HasLabel {
    icon: string,
    value: string
}

export interface Club extends HasLabel {
    members: Members
    language: Language,
    meeting: MeetingType,
    pace: Pace,
    gender: Gender,
    genre: Genre
}

type Language = string

interface Members {
    current: number,
    max: number
}

type Meeting = "Online" | "Physical"

type Pace = number

type Gender = "Male" | "Female" | "All"

type Genre = string

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
    pages: number,
}

export interface BookCandidate extends Book {
    selected: boolean,
    addedBy: string,
    reason: string
}