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
import { camelize } from "@/util/misc";
const { t } = i18n.global

export function initializeButtons(path: string, buttons: Omit<ButtonInterface, 'id'>[]): ButtonInterface[] {
  return buttons.map(button => {
    const text = t(path + button.text);

    return {
    id: camelize(text),
    text,
    type: button.type,
    callback: button.callback,
    active: button.active
    }
  })
}

export function initializeButton(path: string, 
                                 type: ButtonTypes, 
                                 callback: Function, 
                                 active?: Ref<boolean> | undefined): ButtonInterface {
  const text = t(path);

  return {
    id: camelize(text),
    text,
    type,
    callback,
    active
  }
}

export function initializeInputField(id: string,
                                     path: string, 
                                     initialInput?: Ref<string>,
                                     validation?: ValidationGroup, 
                                     password?: boolean): InputFieldInterface {
  return {
    __typename: "InputFieldInterface",
    id,
    label: t(path + id),
    input: initialInput ? initialInput : ref(""),
    password,
    validation
  }
}

export function initializeRadioButton(id: string, 
                                      path: string, 
                                      buttons: string[], 
                                      initialInput: Ref<string>,
                                      validation?: ValidationGroup, 
                                      checkedIndex?: number): RadioButtonInterface {
  return {
    __typename: "RadioButtonInterface",
    id,
    label: t(path + "label"),
    buttons: buttons.map(button => t(path + button)),
    input: initialInput,
    validation,
    checkedIndex
  }
}

export function initializeMultiselectDropdown(id: string, 
                                              path: string, 
                                              optionNames: string[],
                                              initialInput: Ref<string[]>,
                                              validation?: Validation[],
                                              noTranslation?: boolean): MultiselectDropdownInterface {
  const processOption = noTranslation ? 
    (optionName: string): string => optionName : 
    (optionName: string): string => t(path + optionName);
  
  const options: Option[] = optionNames.map(optionName => ({
    label: processOption(optionName), 
    selected: ref(false),
    isVisible: ref(true),
    validation
  }));

  return {
    __typename: "MultiselectDropdownInterface",
    id,
    label: t(path + "label"),
    options,
    input: initialInput,
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