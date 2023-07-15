import { isInputField } from "@/components/util";
import i18n from "@/i18n";
import type { InputComponent, InputComponentGroup, Validation, ValidationGroup } from "@/types/misc";
import { ref, type Ref } from "vue";
const { t } = i18n.global

export function getPlaceholderValidation(): ValidationGroup {
    const placeholderValidation: ValidationGroup = {
        validations: [],
        displayMessage: ref(""),
        error: ref(false),
        dirty: ref(false)
    }

    return Object.assign(placeholderValidation);
}


export enum ValidationId {
    Alphabetical = "alphabetical",
    FirstLetterCapitalized = "firstLetterCapitalized",
    Required = "required",
    Invalid = "invalid",
    MinLength = "minLength",
    MaxLength = "maxLength",
    NotMatching = "notMatching",
    NotNumber = "notNumber"
}

export function initializeValidationGroup(validations: Validation[]): ValidationGroup {
    return {
        validations,
        displayMessage: ref(t("validation.required")),
        error: ref(true),
        dirty: ref(false)
    }
}

export function initializeValidation(validator: Function, message: string, params?: any): Validation {
    return {
        validator,
        message,
        params,
    }
}

export function required(e: Event, params?: any): boolean {
    const target = <HTMLInputElement>e.target;
    return !target.value;
}

export function maxLength(e: Event, maxLength: number): boolean {
    const target = <HTMLInputElement>e.target;
    return target.value.length > maxLength;
}

export function minLength(e: Event, minLength: number) {
    const target = <HTMLInputElement>e.target;
    const length = target.value.length;
    return length !== 0 && target.value.length < minLength
}

export function firstLetterCapitalized(e: Event, params?: any): boolean {
    const target = <HTMLInputElement>e.target;
    const length = target.value.length;
    return length !== 0 && !target.value.substring(0, 1).match(/[A-Z]/);
}

export function nameFormat(e: Event, params?: any): boolean {
    const target = <HTMLInputElement>e.target;
    const length = target.value.length;
    return length !== 0 && !target.value.substring(1, length).match(/^[a-zA-Z]*$/);
}

export function emailFormat(e: Event, params?: any): boolean {
    const target = <HTMLInputElement>e.target;
    const length = target.value.length;
    return length !== 0 && !target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
}

export function confirmPassword(e: Event, password: Ref<string>): boolean {
    const target = <HTMLInputElement>e.target;
    return target.value !== password.value;
}

export function validateAll(validations: ValidationGroup[], 
                            componentGroups: InputComponentGroup[], 
                            requiredFieldKeys: string[]): boolean {
    const noErrors = validations.every(validation => validation.error.value === false);
    const allRequiredFieldsFilled = extractRequiredFieldValues(componentGroups, requiredFieldKeys).every(input => input !== "");

    return noErrors && allRequiredFieldsFilled;
}

export function touchAll(validations: ValidationGroup[]): void {
    validations.forEach(validation => validation.dirty.value = true)
}

export function validate(e: Event, validationGroup: ValidationGroup | undefined): void {
    if(validationGroup) {
        validationGroup.error.value = validationGroup.validations.some(validation => {
            return validation.validator(e, validation.params) === true;
        })

        if(validationGroup.error.value) {
            validationGroup.validations.forEach(validation => {
                if(validation.validator(e, validation.params)) {
                    validationGroup.displayMessage.value = validation.message;
                }
            })
        }
    }
}

export function resetAll(validations: ValidationGroup[], 
                         componentGroups: InputComponentGroup[], 
                         requiredFieldKeys: string[]): void {
    validations.forEach(validation => {
        validation.dirty.value = false;
        validation.error.value = true;
        validation.displayMessage.value = "This field is required."
    })
}

export function touch(validationGroup: ValidationGroup | undefined): void {
    if(validationGroup) validationGroup.dirty.value = true;
}

export function untouch(validationGroup: ValidationGroup | undefined): void {
    if(validationGroup) validationGroup.dirty.value = false;
}

export function getValidationPath(path: string): string {
    return path + "validation."
}

function extractComponents(componentGroups: InputComponentGroup[],
                           requiredFieldKeys: string[]): InputComponent[] {
    return componentGroups.flatMap(group => {
        return group.components.filter(comp => {
            return requiredFieldKeys.some(id => id === comp.id);
        })
    })
}

function extractRequiredFieldValues(componentGroups: InputComponentGroup[],
                                    requiredFieldKeys: string[]): (string | undefined)[] {
    return extractComponents(componentGroups, requiredFieldKeys).map(comp => {
        if(isInputField(comp)) {
            return comp.input.value;
        }
    })
}