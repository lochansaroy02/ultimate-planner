import { create } from "zustand";


interface signUpInterface {
    username: string,
    email: string,
    password: string
}
interface userInterface {
    userData: null,
    isLoggedIn: boolean,
    signUp: () => Promise<any>,
    logIn: () => Promise<any>,
}


export const userStore = create<userInterface>((set) => ({
    userData: null,
    isLoggedIn: false,
    signUp: async (

    ) => {

    },
    logIn: async () => {

    }

}))


