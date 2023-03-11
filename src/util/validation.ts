import type { Validation, ValidationGroup } from "@/types/misc";
import { ref, type Ref } from "vue";

export function initializeValidationGroup(validations: Validation[]): ValidationGroup {
    return {
        validations,
        displayMessage: ref(""),
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
    return target.value.length < minLength
}

export function emailFormat(e: Event, params?: any): boolean {
    const target = <HTMLInputElement>e.target;
    return !target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
}

export function confirmPassword(e: Event, password: Ref<string>): boolean {
    const target = <HTMLInputElement>e.target;
    return target.value !== password.value;
}

export function validate(e: Event, validationGroup: ValidationGroup | undefined): void {
    if(validationGroup) {
        validationGroup.error.value = validationGroup.validations.some(validation => {
            return validation.validator(e, validation.params) === true;
        })

        if(validationGroup.error.value) {
            validationGroup.validations.forEach(validation => {
                if(validation.validator(e, validation.params)) {
                    validationGroup.error.value = true;
                    validationGroup.displayMessage.value = validation.message;
                }
            })
        }
        // validationGroup.validations.forEach(validation => {
        //     if(validation.validator(e, validation.params)) {
        //         validationGroup.error.value = true;
        //         validationGroup.displayMessage.value = validation.message;
        //     }
        // })
    }
}

export function reset(validationGroup: ValidationGroup | undefined): void {
    if(validationGroup) validationGroup.error.value = false;
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