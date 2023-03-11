import type { 
    ButtonTypes,
    ButtonInterface,
    InputFieldInterface,
    MultiselectDropdownInterface,
    RadioButtonInterface, 
    Option,
    Validation,
    InputComponent,
    InputComponentGroup,
    ValidationGroup} from "@/types/misc";
import i18n from "@/i18n";
import { ref, type Ref } from "vue";
const { t } = i18n.global

export function initializeButtons(path: string, buttons: ButtonInterface[]): ButtonInterface[] {
  return buttons.map(button => ({
    text: t(path + button.text),
    type: button.type,
    callback: button.callback,
    active: button.active
  }))
}

export function initializeButton(path: string, type: ButtonTypes, callback: Function, active?: Ref<boolean> | undefined): ButtonInterface {
  return {
    text: t(path),
    type,
    callback,
    active
  }
}

export function initializeInputField(id: string | number, path: string, validation?: ValidationGroup, password?: boolean): InputFieldInterface {
  return {
    __typename: "InputFieldInterface",
    id,
    label: t(path + id),
    input: ref(""),
    password,
    validation
  }
}

export function initializeRadioButton(id: string | number, path: string, buttons: string[], validation?: ValidationGroup, checkedIndex?: number): RadioButtonInterface {
  return {
    __typename: "RadioButtonInterface",
    id,
    label: t(path + "label"),
    buttons: buttons.map(button => t(path + button)),
    validation,
    checkedIndex
  }
}

export function initializeMultiselectDropdown(id: string | number, path: string, optionNames: string[], customOptions?: boolean, validation?: Validation[]): MultiselectDropdownInterface {
  const options: Option[] = customOptions ? 
  optionNames.map(optionName => ({
    label: optionName,
    selected: ref(false),
    isVisible: ref(true),
    validation
  })) :
  optionNames.map(optionName => ({
    label: t(path + optionName), 
    selected: ref(false),
    isVisible: ref(true),
    validation
  }));

  return {
    __typename: "MultiselectDropdownInterface",
    id,
    label: t(path + "label"),
    options,
    placeholderPath: path
  }
}

export function initializeInputComponentGroup(path: string, components: InputComponent[]): InputComponentGroup {
  return {
    label: t(path),
    components
  }
}

export function isInputField(component: InputComponent): component is InputFieldInterface {
  return component.__typename === "InputFieldInterface";
}
  
export function isRadioButton(component: InputComponent): component is RadioButtonInterface {
  return component.__typename === "RadioButtonInterface";
}

export function isMultiselectDropdown(component: InputComponent): component is MultiselectDropdownInterface {
  return component.__typename === "MultiselectDropdownInterface";
}

export function assertIsNode(target: EventTarget | null): asserts target is Node {
  if(!target || !("nodeType" in target)) {
    throw new Error("Node expected");
  }
}