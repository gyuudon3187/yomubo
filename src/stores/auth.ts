import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import { ref, computed } from "vue";
import type { Ref } from "vue";
import { 
  createUserWithEmailAndPassword, 
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  getAuth, 
  type Auth,
  type User } from "firebase/auth";
import { firebaseApp } from "@/config/firebaseConfig";
import type { InputComponent, InputComponentGroup, ValidationGroup } from "@/types/misc";
const auth = getAuth(firebaseApp);

interface RegistrationForm {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  gender: string,
  languages: string[]
}

interface LoginForm {
  email: string,
  password: string
}

export const useAuthStore = defineStore("authStore", () => {
  const { toggleLoading } = useLoadingStore();
  
  const uid = ref("");
  const isAuthenticated = computed(() => !!uid.value)
  const firstName = ref("");
  const lastName = ref("");
  const languages: Ref<string[]> = ref([])

  function createUser(payload: RegistrationForm, componentGroups: InputComponentGroup[]) {
    toggleLoading();
    createUserWithEmailAndPassword(auth as Auth, payload.email, payload.password).then(() => {
        firstName.value = payload.firstName;
        lastName.value = payload.lastName;
        languages.value = payload.languages;
        toggleLoading();
      }).catch (e => {
        if(e.code === "auth/email-already-in-use") {
          componentGroups.forEach(group => {
            if(group.label === "E-mail Address") {
              setValidation(0, "E-mail already registered.", group.components);
            }
          });
        } else {
          console.log(e.code);
        }
        toggleLoading();
      }
    )
    
  }

  async function listenToAuthChanges() {
    return new Promise(resolve => {
      onAuthStateChanged(auth as Auth, user => {
        uid.value = isUser(user) ? user.uid : "";
        resolve("Success");
      })
    }).then(() => isAuthenticated)

    function isUser(user: any): user is User {
      return !!user ? "uid" in user : false;
    }
  }

  async function logIn(payload: LoginForm, components: InputComponent[]) {
    signInWithEmailAndPassword(auth as Auth, payload.email, payload.password).catch(e => {
      switch(e.code) {
        case "auth/user-not-found": 
          setValidation(0, "Invalid e-mail", components);
          break;
        case "auth/wrong-password":
          setValidation(1, "Invalid password", components);
          break;
        default:
          console.log(e.code);
      }
    })
  }

  async function logOut() {
    signOut(auth as Auth);
  }

  function setValidation(index: number, message: string, components: InputComponent[]) {
    const validation = components[index].validation;

    validation!.displayMessage.value = message;
    validation!.dirty.value = true;
    validation!.error.value = true;
  }

  return { createUser, listenToAuthChanges, logOut, logIn, isAuthenticated, uid }
})