<template>
    <main>
        <router-view></router-view>
    </main>

</template>

<script setup>
    /** Import custom css */
    import '@/assets/css/main.css';

    /** Import package */
    import { computed, onMounted } from 'vue';

    /** Import store */
    import { useAuthStore } from "@/stores";

    /**  Define variables and store */
    const authStore = useAuthStore();

    const isDevelopment = computed(() => import.meta.env.VITE_APP_ENV === 'local');

    // Load settings from local storage when the app starts
    onMounted(async () => {
        await authStore.checkLogin();
    });

</script>