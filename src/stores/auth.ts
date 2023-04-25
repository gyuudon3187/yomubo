import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import { ref } from "vue";
import type { Ref } from "vue";
import { createUserWithEmailAndPassword, getAuth, type Auth } from "firebase/auth";
import { firebaseApp } from "@/config/firebaseConfig";
import { FirebaseError } from "firebase/app";
import type { InputComponentGroup } from "@/types/misc";
const auth = getAuth(firebaseApp);

interface RegistrationForm {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  gender: string,
  languages: string[]
}

export const useAuthStore = defineStore("authStore", () => {
  const { toggleLoading } = useLoadingStore();
  
  const uid = ref("");
  const firstName = ref("");
  const lastName = ref("");
  const languages: Ref<string[]> = ref([])

  function createUser(payload: RegistrationForm, componentGroups: InputComponentGroup[] ) {
    toggleLoading();
    createUserWithEmailAndPassword(auth as Auth, payload.email, payload.password).then(result => {
        uid.value = result.user.uid;
        firstName.value = payload.firstName;
        lastName.value = payload.lastName;
        languages.value = payload.languages;
        toggleLoading();
      }).catch (e => {
        if(e.code === "auth/email-already-in-use") {
          componentGroups.forEach(group => {
            if(group.label === "E-mail Address") {
              group.components[0].validation!.displayMessage.value = "E-mail already registered.";
              group.components[0].validation!.dirty.value = true;
              group.components[0].validation!.error.value = true;
            }
          });
        } else {
          console.log(e.code);
        }
        toggleLoading();
      }
    )
    
  }

  return { createUser }
})