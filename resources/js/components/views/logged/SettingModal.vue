<template>
    <div class="settings" :class="{ 'open': isOpen }">
        <div class="settings-toggle" @click="isOpen = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sliders align-middle"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
        </div>

        <div class="settings-panel">
            <div class="settings-content">
                <div class="settings-title d-flex align-items-center">
                    <button type="button" @click="isOpen = false" class="btn-close float-right" aria-label="Close"></button>

                    <h4 class="mb-0 ms-2 d-inline-block">Setting Panel</h4>
                </div>
                <div class="settings-body">

                    <div class="alert alert-primary" role="alert">
                        <div class="alert-message">
                            <strong>Hey there!</strong> Choose the color scheme, sidebar and layout that best fits your project needs.
                        </div>
                    </div>

                    <div class="mb-3">
                        <span class="d-block fw-bold">Color scheme</span>
                        <span class="d-block text-muted mb-2">The perfect color mode for your app.</span>
                        <div class="row g-0 text-center mx-n1 mb-2">
                            <div class="col">
                                <label class="mx-1 d-block mb-1">
                                    <input class="settings-scheme-label" type="radio" name="theme" value="default" v-model="panelTheme">
                                    <div class="settings-scheme">
                                    <div class="settings-scheme-theme settings-scheme-theme-default"></div>
                                    </div>
                                </label>
                                Default
                            </div>
                            <div class="col">
                                <label class="mx-1 d-block mb-1">
                                    <input class="settings-scheme-label" type="radio" name="theme" value="colored" v-model="panelTheme">
                                    <div class="settings-scheme">
                                    <div class="settings-scheme-theme settings-scheme-theme-colored"></div>
                                    </div>
                                </label>
                                Colored
                            </div>
                        </div>
                        <div class="row g-0 text-center mx-n1">
                            <div class="col">
                                <label class="mx-1 d-block mb-1">
                                    <input class="settings-scheme-label" type="radio" name="theme" value="dark" v-model="panelTheme">
                                    <div class="settings-scheme">
                                    <div class="settings-scheme-theme settings-scheme-theme-dark"></div>
                                    </div>
                                </label>
                                Dark
                            </div>
                            <div class="col">
                                <label class="mx-1 d-block mb-1">
                                    <input class="settings-scheme-label" type="radio" name="theme" value="light" v-model="panelTheme">
                                    <div class="settings-scheme">
                                    <div class="settings-scheme-theme settings-scheme-theme-light"></div>
                                    </div>
                                </label>
                                Light
                            </div>
                        </div>
                    </div>
                    
                    <hr>

                    <div class="mb-3">
                        <span class="d-block fw-bold">Sidebar layout</span>
                        <span class="d-block text-muted mb-2">Change the layout of the sidebar.</span>
                        <div>
                            <label>
                                <input class="settings-button-label" type="radio" name="sidebarLayout" value="default" v-model="sidebarLayout" />
                                <div class="settings-button">
                                    Default
                                </div>
                            </label>
                            <label>
                                <input class="settings-button-label" type="radio" name="sidebarLayout" value="compact" v-model="sidebarLayout" />
                                <div class="settings-button">
                                    Compact
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="settings-footer">
                    <div class="d-grid">
                        <a class="btn btn-primary btn-lg btn-block" href="#" target="_blank">Read documentation ...</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    /** Import package */
    import { ref, computed } from "vue";
    /** Import store */
    import { useSettingPanelStore } from "@/stores";

    /** Use store */
    const settingPanelStore = useSettingPanelStore();
    
    /** Init variable state */
    let isOpen = ref(false);

    const sidebarLayout = computed({
        get: () => settingPanelStore.sidebarLayout,
        set: (value) => settingPanelStore.setSidebarLayout(value),
    });

    const panelTheme = computed({
        get: () => settingPanelStore.panelTheme,
        set: (value) => settingPanelStore.setPanelTheme(value),
    });

</script>