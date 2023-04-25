import { describe, it, expect, afterAll, beforeAll, beforeEach, vi, afterEach } from "vitest";

import { mount } from "@vue/test-utils";
import RegistrationModal from "../LandingPage/RegistrationModal.vue";
import LandingPage from "@/views/LandingPage/LandingPageView.vue";
import router from "@/router";
import type { Auth } from "firebase/auth";
import { FirebaseError } from "firebase/app";

enum ComponentId {
  login = "#logIn",
  signup = "#signUp",
  submit = "#submit",
  firstName = "#firstName",
  lastName = "#lastName",
  email = "#registrationEmail",
  password = "#registrationPassword",
  confirmPassword = "#confirmPassword"
}

enum ValidationId {
  firstName = "#firstNameValidation",
  lastName = "#lastNameValidation",
  email = "#registrationEmailValidation",
  password = "#registrationPasswordValidation",
  confirmPassword = "#confirmPasswordValidation"
}

const setup = {
  global: {
    stubs: ['Icon'],
    plugins: [router]
  }
}

const landingPage = mount(LandingPage, setup);

router.push('/');
await router.isReady()

vi.mock('firebase/auth', async () => {
  const firebaseAuth: any = await vi.importActual('firebase/auth');

  const createUserFails = (auth: Auth, email: string, password: string) => {
    return Promise.reject(new FirebaseError('auth/email-already-in-use', ''))
  }

  return {
    ...firebaseAuth,
    createUserWithEmailAndPassword: vi.fn().mockImplementationOnce(createUserFails)
  }
})

describe("Home view", () => {
  describe("Login button", async () => {
    const loginButton = landingPage.find(ComponentId.login);

    it("renders", () => {
      expect(loginButton.exists()).toBe(true);
    })

    it("has correct English translation", () => {
      expect(loginButton.text()).toEqual("Log in");
    })
  })

  describe("Sign-up button", () => {
    const signupButton = landingPage.find(ComponentId.signup);
    
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
    const signupButton = landingPage.find(ComponentId.signup);
    await signupButton.trigger("click");
    expect(registrationModal.isVisible()).toBe(true)
  })

  describe("Validation", () => {
    const required = "This field is required.";

    describe("First name validation message", () => {
      const firstName = landingPage.find(ComponentId.firstName);
      const validation = landingPage.find(ValidationId.firstName);

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

      it("shows when blurred and the first character is followed by non-alphabetical characters", async () => {
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
      const validation = landingPage.find(ValidationId.lastName);

      it("is never rendered", async () => {
        expect(validation.exists()).toBe(false);
      })
    })

    describe("E-mail validation message", () => {
      const email = landingPage.find(ComponentId.email);
      const validation = landingPage.find(ValidationId.email);
      const invalidEmail = "Invalid E-mail address."

      const firstName = landingPage.find(ComponentId.firstName);
      const password = landingPage.find(ComponentId.password);
      const confirmPassword = landingPage.find(ComponentId.confirmPassword);
      const submit = landingPage.find(ComponentId.submit);

      const allInputFields = [email, firstName, password, confirmPassword];

      afterAll(() => {
        allInputFields.forEach(async inputField => {
          inputField.setValue("");
          await inputField.trigger("focus");
        })
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

      it("shows upon submission when email address is already registered", async () => {
        enum ValidInput {
          firstName = "Fredric",
          email = "fredric@test.com",
          password = "testpw",
          confirmPassword = "testpw"
        }

        firstName.setValue(ValidInput.firstName);
        email.setValue(ValidInput.email);
        password.setValue(ValidInput.password);
        confirmPassword.setValue(ValidInput.confirmPassword);
        allInputFields.forEach(async inputField => {
          await inputField.trigger("blur");
        })

        submit.trigger("click");
        
        await new Promise(r => setTimeout(r, 0));
        expect(validation.text()).toBe("E-mail already registered.");
      })
    })

    describe("Password validation message", () => {
      const password = landingPage.find(ComponentId.password);
      const validation = landingPage.find(ValidationId.password);

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
      const confirmPassword = landingPage.find(ComponentId.confirmPassword);
      const validation = landingPage.find(ValidationId.confirmPassword);
      const password = landingPage.find(ComponentId.password);

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
        const someText = "abcde";
        const differentText = "bcdef";

        password.setValue(someText);
        confirmPassword.setValue(differentText);
        await confirmPassword.trigger("blur");
        expect(validation.text()).toBe("Passwords are not matching.");
      })

      it("does not show when passwords match", async () => {
        const sameText = "abcde";

        password.setValue(sameText);
        confirmPassword.setValue(sameText);
        await confirmPassword.trigger("blur");
        expect(validation.isVisible()).toBe(false);
      })
    })
  })
})