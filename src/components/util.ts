import type { 
    ButtonTypes,
    ButtonInterface,
    InputFieldInterface,
    MultiselectDropdownInterface,
    RadioButtonInterface,
    DatePickerInterface,
    Club,
    BookCandidate,
    Option,
    Validation,
    InputComponent,
    InputComponentGroup,
    ValidationGroup,
    AccordionItem,
    LocationPickerInterface,
    TextAreaInterface} from "@/types/misc";
import i18n from "@/i18n";
import { ref, type Ref } from "vue";
import { camelize } from "@/util/misc";
const { t } = i18n.global

export enum Stage {
  Start = "start",
  Voting = "voting",
  Reading = "reading",
  Discussing = "discussing"
}

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

export function initializeDatePicker(id: string, path: string, data: Ref<Date>): DatePickerInterface {
  return {
    __typename: "DatePickerInterface",
    id,
    label: t(path + "label"),
    data
  }
}

export function initializeLocationPicker(id: string, path: string, data: Ref<string>): LocationPickerInterface {
  return {
    __typename: "LocationPickerInterface",
    id,
    label: t(path + "label"),
    data
  }
}

export function initializeClubAccordionItems(clubs: Club[]): AccordionItem[] {
  return clubs.map(club => ({
    label: club.label,
    data: club,
    selected: false,
    subItems: [
      {
        label: "Members", 
        icon: "fa-solid fa-user-group", 
        value: club.members.length + "/" + club.maxMemberCount
      },
      {
        label: "Language",
        icon: "fa-solid fa-language",
        value: club.language
      },
      {
        label: "Meetings",
        icon: "fa-solid fa-users",
        value: club.meeting
      },
      {
        label: "Pace",
        icon: "fa-solid fa-gauge-high",
        value: club.pace + " pages/month"
      },
      {
        label: "Gender",
        icon: "fa-solid fa-venus-mars",
        value: club.gender
      },
      {
        label: "Genre",
        icon: "fa-solid fa-masks-theater",
        value: club.genre
      }
    ]
  }))
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

export function isDatePicker(component: InputComponent): component is DatePickerInterface {
  return component.__typename === "DatePickerInterface";
}

export function isLocationPicker(component: InputComponent): component is LocationPickerInterface {
  return component.__typename === "LocationPickerInterface";
}

export function isTextArea(component: InputComponent): component is TextAreaInterface {
  return component.__typename === "TextAreaInterface";
}

export function assertIsNode(target: EventTarget | null): asserts target is Node {
  if(!target || !("nodeType" in target)) {
    throw new Error("Node expected");
  }
}

export function changeSelectionOnScroll<T extends { selected: boolean }>(e: WheelEvent, selectedIndex: Ref<number>, items: Ref<T[]>) {
  let updatedIndex = selectedIndex.value;

  const determineIndexToBeUpdatedBasedOnScrollDirection = (index: number) => index + (e.deltaY < 0 ? -1 : 1);
  const indexToBeUpdated = determineIndexToBeUpdatedBasedOnScrollDirection(selectedIndex.value);

  if(indexToBeUpdated >= 0 && indexToBeUpdated < items.value.length) {
      items.value = items.value.map((item, index) => {
          if(index === indexToBeUpdated) updatedIndex = index;
          return Object.assign(item, { 
              selected: index === indexToBeUpdated ? true :
                        index === selectedIndex.value ? false :
                        item.selected
          })
      })
  }

  selectedIndex.value = updatedIndex;
  e.preventDefault()
}

export function getLabelPath(path: string): string {
  return path + "label";
}