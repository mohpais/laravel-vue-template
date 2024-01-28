<template>
    <!-- Header Section Begin -->
    <Header :authenticatedUser="authStore.authUser" @handleLogout="handleLogout" />
    <!-- Header End -->
    <router-view></router-view>
    <!-- Footer Section Begin -->
    <Footer />
    <!-- Footer End -->

</template>

<script setup>
    /** Import custom css */
    import '@/assets/css/main.css';

    /** Import package */
    import { ref, computed, onMounted, watch } from 'vue';
    import { useRouter } from "vue-router";

    /** Import store */
    import { useAuthStore } from "@/stores";

    /** Import components */
    import Header from '@/components/organisms/main/Header.vue';
    import Footer from '@/components/organisms/main/Footer.vue';
    
    /** Import global */
    import helpers from '@/global/helpers';

    /**  Define variables and store */
    const authStore = useAuthStore();

    const isDevelopment = computed(() => import.meta.env.VITE_APP_ENV === 'local');

    /** Define method */
    const handleLogout = () => {
        authStore.logout();
    }

    // Load settings from local storage when the app starts
    onMounted(async () => {
        await authStore.checkLogin();
    });

</script>