import { defineStore } from "pinia";
import helpers from '@/global/helpers';
import Rest from "@/global/rest"; // Import from Global Packages
const rest = new Rest().Api(); // Creating a Rest instance

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authenticated: false,
        authUser: null,
        roleUser: null,
        welcomePopup: false
    }),
    getters: {
        user: (state) => state.authUser
    },
    actions: {
        async checkLogin() {
            const token = sessionStorage.getItem("_xa");
            const _user = sessionStorage.getItem("_us");
            const _role = sessionStorage.getItem("_rl");
            if (token && _user && _role) {
                const user = JSON.parse(helpers.dec(_user, 1, 6));
                const role = JSON.parse(helpers.dec(_role, 1, 6));

                if (user && role) {
                    this.authUser = user;
                    this.roleUser = role;
                    this.authenticated = true;
                }
            }
        },
        setWelcomePopup() {
            this.welcomePopup = true;
        },
        async getProfile() {
            try {
                const response = await rest.get('auth/me');
                this.authUser = response.data;
                this.authenticated = true;
                sessionStorage.setItem('_us', helpers.enc(JSON.stringify(response.data), 1, 6));
            } catch (error) {
                this.authUser = null
                this.authenticated = false
            }
        },
        refreshToken(new_token) {
            if (sessionStorage.getItem('_xa')) {
                sessionStorage.setItem('_xa', new_token);
            }
        },
        logout() {
            sessionStorage.removeItem("_xa");
            sessionStorage.removeItem("_us");
            sessionStorage.removeItem("_rl");
            this.authUser = null;
            this.roleUser = null;
            this.authenticated = false;
        }
    }
})