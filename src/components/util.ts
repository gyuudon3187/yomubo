import type { 
    ButtonTypes,
    ButtonInterface,
    InputFieldInterface,
    MultiselectDropdownInterface,
    RadioButtonInterface, 
    InputComponent,
    InputComponentGroup} from "@/types/misc"
import { ref } from "vue";
import i18n from "@/i18n";
const { t } = i18n.global

export function initializeButton(path: string, type: ButtonTypes, callback: Function): ButtonInterface {
    return {
        text: t(path),
        type,
        callback
    }
}

export function initializeInputField(path: string): InputFieldInterface {
    return {
        __typename: "InputFieldInterface",
        label: t(path)
    }
}

export function initializeRadioButton(path: string, buttons: string[]): RadioButtonInterface {
    return {
        __typename: "RadioButtonInterface",
        label: t(path + "label"),
        buttons: buttons.map(button => t(path + button))
    }
}

export function initializeMultiselectDropdown(path: string, options: string[]): MultiselectDropdownInterface {
    return {
        __typename: "MultiselectDropdownInterface",
        label: t(path + "label"),
        options: options.map(option => t(path + option))
    }
}

export function initializeInputComponentGroup(path: string, components: InputComponent[]): InputComponentGroup {
    return {
        label: t(path),
        components
    }
}