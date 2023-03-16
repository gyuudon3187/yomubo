import { describe, it, expect, afterAll, beforeAll, beforeEach } from "vitest";


import { mount } from "@vue/test-utils";
import RegistrationModal from "../LandingPage/RegistrationModal.vue";
import LandingPage from "@/views/LandingPage/LandingPageView.vue";
import router from "@/router";

const setup = {
  global: {
    stubs: ['Icon'],
    plugins: [router]
  }
}

const landingPage = mount(LandingPage, setup);

router.push('/');
await router.isReady()

describe("Home view", () => {
  describe("Login button", async () => {
    const loginButton = landingPage.find("#logIn");

    it("renders", () => {
      expect(loginButton.exists()).toBe(true);
    })

    it("has correct English translation", () => {
      expect(loginButton.text()).toEqual("Log in");
    })
  })

  describe("Sign-up button", () => {
    const signupButton = landingPage.find("#signUp");
    
    it("renders", () => {
      expect(signupButton.exists()).toBe(true);
    })

    it("has correct English translation", () => {
      expect(signupButton.text()).toEqual("Sign up");
    })
  })
})

describe("Registration modal", () => {
  const registrationModal = landingPage.findComponent(RegistrationModal);

  it("renders", () => {
    expect(registrationModal.exists()).toBe(true);
  })

  it("is initially invisible", () => {
    expect(registrationModal.isVisible()).toBe(false);
  })

  it("becomes visible after clicking on sign-up button", async () => {
    const signupButton = landingPage.find("#signUp");
    await signupButton.trigger("click");
    expect(registrationModal.isVisible()).toBe(true)
  })

  describe("Validation", () => {
    const required = "This field is required.";

    describe("First name validation message", () => {
      const firstName = landingPage.find("#firstName");
      const validation = landingPage.find("#firstNameValidation");

      afterAll(async () => {
        firstName.setValue("");
        await firstName.trigger("focus");
      })

      it("is initially invisible", () => {
        expect(firstName.text()).toEqual("");
        expect(validation.isVisible()).toBe(false);
      })

      it("shows when blurred and first letter non-capitalized", async () => {
        firstName.setValue("a");
        await firstName.trigger("blur");
        expect(validation.isVisible()).toBe(true);
        expect(validation.text()).toBe("First letter must be capitalized.");
      })

      it("shows when blurred and the first characters is followed by non-alphabetical characters", async () => {
        firstName.setValue("A9");
        await firstName.trigger("blur");
        expect(validation.isVisible()).toBe(true);
        expect(validation.text()).toBe("Only alphabetical letters allowed.")
      })

      it("shows when blurred and given input longer than 20 chars", async () => {
        firstName.setValue("A" + "a".repeat(20));
        await firstName.trigger("blur");
        expect(validation.isVisible()).toBe(true);
        expect(validation.text()).toBe("Must be below 20 characters.")
      })

      it("does not show when blurred and given proper input", async () => {
        firstName.setValue("Fredric");
        await firstName.trigger("blur");
        expect(validation.isVisible()).toBe(false);
      })
    })

    describe("Last name validation message", () => {
      const validation = landingPage.find("#lastNameValidation");

      it("is never rendered", async () => {
        expect(validation.exists()).toBe(false);
      })
    })

    describe("E-mail validation message", () => {
      const email = landingPage.find("#registrationEmail");
      const validation = landingPage.find("#registrationEmailValidation");
      const invalidEmail = "Invalid E-mail address."

      afterAll(async () => {
        email.setValue("");
        await email.trigger("focus");
      })

      it("is initially invisible", () => {
        expect(email.text()).toBe("");
        expect(validation.isVisible()).toBe(false);
      })

      it("shows when blurred without input", async () => {
        await email.trigger("blur");
        expect(validation.isVisible()).toBe(true);
        expect(validation.text()).toBe(required);
      })

      it("shows when email address lacks @ sign and domain", async () => {
        email.setValue("a");
        await email.trigger("blur");
        expect(validation.isVisible()).toBe(true);
        expect(validation.text()).toBe(invalidEmail);
      })

      it("shows when email address lacks @ sign only", async () => {
        email.setValue("a.com");
        await email.trigger("blur");
        expect(validation.isVisible()).toBe(true);
        expect(validation.text()).toBe(invalidEmail);
      })

      it("shows when email address lacks domain only", async () => {
        email.setValue("a@");
        await email.trigger("blur");
        expect(validation.isVisible()).toBe(true);
        expect(validation.text()).toBe(invalidEmail);
      })
    })

    describe("Password validation message", () => {
      const password = landingPage.find("#registrationPassword");
      const validation = landingPage.find("#registrationPasswordValidation");

      afterAll(async () => {
        password.setValue("");
        await password.trigger("focus");
      })

      it("is initially invisible", () => {
        expect(password.text()).toBe("");
        expect(validation.isVisible()).toBe(false);
      })

      it("shows when blurred without input", async () => {
        await password.trigger("blur");
        expect(validation.isVisible()).toBe(true);
        expect(validation.text()).toBe(required);
      })

      it("shows when password is less than 5 characters", async () => {
        password.setValue("a1#P");
        await password.trigger("blur");
        expect(validation.isVisible()).toBe(true);
        expect(validation.text()).toBe("Must be at least 5 characters.");
      })
    })

    describe("Confirm password validation message", () => {
      const confirmPassword = landingPage.find("#confirmPassword");
      const validation = landingPage.find("#confirmPasswordValidation")
      const password = landingPage.find("#registrationPassword");

      afterAll(async () => {
        confirmPassword.setValue("");
        password.setValue("");
        await confirmPassword.trigger("focus");
        await password.trigger("focus");
      })

      it("is initially invisible", () => {
        expect(confirmPassword.text()).toBe("");
        expect(validation.isVisible()).toBe(false);
      })

      it("shows when only the password has been given input", async () => {
        password.setValue("abcde");
        confirmPassword.setValue("bcdef");
        await confirmPassword.trigger("blur");
        expect(validation.text()).toBe("Passwords are not matching.");
      })

      it("does not show when passwords match", async () => {
        password.setValue("abcde");
        confirmPassword.setValue("abcde");
        await confirmPassword.trigger("blur");
        expect(validation.isVisible()).toBe(false);
      })
    })

    describe("Simultaneous validation of all required fields", () => {
      const firstName = landingPage.find("#firstName");
      const lastName = landingPage.find("#lastName");
      const email = landingPage.find("#registrationEmail");
      const password = landingPage.find("#registrationPassword");
      const confirmPassword = landingPage.find("#confirmPassword");

      const firstNameValidation = landingPage.find("#firstNameValidation");
      const lastNameValidation = landingPage.find("#lastNameValidation");
      const emailValidation = landingPage.find("#registrationEmailValidation");
      const passwordValidation = landingPage.find("#registrationPasswordValidation");
      const confirmPasswordValidation = landingPage.find("#confirmPasswordValidation");

      const allFields = [
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      ]

      const existingValidations = [
        firstNameValidation,
        emailValidation,
        passwordValidation,
        confirmPasswordValidation
      ]

      const submissionButton = landingPage.find("#submit");

      beforeEach(() => {
        allFields.forEach(async field => {
          field.setValue("");
          await field.trigger("focus");
        });
      })

      it("does not include validation of last name", () => {
        expect(lastNameValidation.exists()).toBe(false);
      })
      
      it("is not done before submission", () => {
        existingValidations.forEach(validation => {
          expect(validation.isVisible()).toBe(false);
        })
      })

      it("is done after attempt to submit", async () => {
        await submissionButton.trigger("click");
        existingValidations.forEach(async validation => {
          await expect(validation.isVisible()).toBe(true);
          await expect(validation.text()).toBe(required);
        })
      })
    })
  })
})