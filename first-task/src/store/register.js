import { defineStore } from "pinia"

export const useRegisterStore = defineStore('register', {
    state: () => {
        return {
          name: null,
          surname: null,
          birthday: null,
          phone: null,
          email: null,
          experiences: [],
        };
    }
})