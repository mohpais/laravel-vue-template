<template>
    <div class="wrapper">
        <!-- Sidebar Page -->
        <SidebarPanel :authenticatedUser="authStore.authUser" :authenticatedRole="authStore.roleUser" :isCollapsed="settingPanelStore.isCollapsed" />
        <div class="main">
            <!-- Header Page -->
            <NavbarPanel @handleSidebar="handleSidebar(!settingPanelStore.isCollapsed)" @handleLogout="handleLogout" />
            <main class="content">
                <router-view></router-view>
            </main>
            <!-- Footer Page -->
            <FooterPanel />
        </div>
    </div>
    <SettingPanel v-if="isDevelopment" />
</template>

<script setup>
    /** Import custom css */
    import '@/assets/css/mycustom.css';
    
    /** Import package */
    import { computed, onMounted, watch } from 'vue';
    import { useRouter } from "vue-router";
    
    /** Import store */
    import { useSettingPanelStore, useAuthStore } from "@/stores";

    /** Import components */
    import SettingPanel from '@/components/views/logged/SettingModal.vue';
    import SidebarPanel from '@/components/views/logged/SidebarPage.vue';
    import NavbarPanel from '@/components/views/logged/NavbarPage.vue';
    import FooterPanel from '@/components/views/logged/FooterPage.vue';
    
    /** Import global */
    import helpers from '@/global/helpers';

    /**  Define variables and store */
    const settingPanelStore = useSettingPanelStore();
    const authStore = useAuthStore();
    const router = useRouter();

    const isDevelopment = computed(() => import.meta.env.VITE_APP_ENV === 'local');
    
    /** Define method */
    const handleSidebar = () => {
        settingPanelStore.setCollapsed();
    };

    const handleLogout = () => {
        authStore.logout();
        window.location.reload();
    }

    // Load settings from local storage when the app starts
    onMounted(() => {
        if (!authStore.welcomePopup) {
            helpers.alertToast('success', "Login success!");
            authStore.setWelcomePopup();
        }
        if (import.meta.env.VITE_APP_ENV === 'local') {
            settingPanelStore.loadSettingsFromLocalStorage();
        }
    });

    watch(settingPanelStore.$state, (newValue, oldValue) => {
        settingPanelStore.saveSettingsToLocalStorage(newValue);
    });
    
</script>

<style></style>