import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DecodedToken {
    userId: string;
    iat: number;
    exp: number;
}

interface userInterface {
    userData: any | null;
    isLoggedIn: boolean;
    signUp: (username: string, email: string, password: string) => Promise<void>;
    logIn: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loadUserFromToken: () => void;
}

export const useUserStore = create<userInterface>()(
    persist(
        (set) => ({
            userData: null,
            isLoggedIn: false,

            signUp: async (username, email, password) => {
                try {
                    const response = await axios.post("/api/auth/signup", {
                        username, email, password
                    });
                    const data = response.data;
                    // Optional: auto-login or set state
                } catch (error) {
                    console.error(error);
                }
            },

            logIn: async (email, password) => {
                try {
                    const response = await axios.post("/api/auth/login", {
                        email,
                        password,
                    });

                    const token = response.data.token;
                    const data = response.data;

                    localStorage.setItem("token", token);
                    const decoded = jwtDecode<DecodedToken>(token);
                    set({
                        userData: {
                            userId: decoded.userId,
                            data: data
                        },
                        isLoggedIn: true,
                    });

                } catch (err) {
                    console.error("Login error:", err);
                }
            },

            logout: () => {
                localStorage.removeItem("token");
                set({ userData: null, isLoggedIn: false });
            },

            loadUserFromToken: () => {
                const token = localStorage.getItem("token");
                if (token) {
                    try {
                        const decoded = jwtDecode<DecodedToken>(token);
                        set({
                            userData: { userId: decoded.userId },
                            isLoggedIn: true,
                        });
                    } catch (err) {
                        console.error("Invalid token");
                        localStorage.removeItem("token");
                    }
                }
            },
        }),
        {
            name: "user-storage", // name in localStorage
            partialize: (state) => ({
                userData: state.userData,
                isLoggedIn: state.isLoggedIn,
            }),
        }
    )
);
