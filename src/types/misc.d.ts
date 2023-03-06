import type { Ref } from "vue";

export interface InputComponentGroup extends HasLabel {
    components: InputComponent[]
}

export type InputComponent = InputFieldInterface | RadioButtonInterface | MultiselectDropdownInterface

export interface InputFieldInterface extends HasLabel {
    __typename: "InputFieldInterface"
}

export interface RadioButtonInterface extends HasLabel {
    __typename: "RadioButtonInterface",
    buttons: string[]
}

export interface MultiselectDropdownInterface extends HasLabel {
    __typename: "MultiselectDropdownInterface",
    options: string[]
}

interface HasLabel {
    label: string
}

export interface ButtonInterface {
    text: string,
    type: ButtonTypes,
    callback: Function
}

type ButtonTypes = "primary" | "secondary" | "tertiary" | "negative"