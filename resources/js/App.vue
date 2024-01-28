<script setup>
    import { markRaw, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';

    import DefaltLayout from '@/loading-screen.vue';
    const layout = ref();
    const route = useRoute();

    watch(
        () => route.meta?.layout,
        async (metaLayout) => {
            try {
                const component = metaLayout && (await import(`@/layouts/${metaLayout}.vue`));
                layout.value = markRaw(component?.default || DefaltLayout);
            } catch (error) {
                layout.value = markRaw(DefaltLayout);
            }
        },
        { immediate: true }
    )
</script>

<template>
    <component :is="layout">
        <router-view></router-view>
    </component>
</template>

<style scoped></style>