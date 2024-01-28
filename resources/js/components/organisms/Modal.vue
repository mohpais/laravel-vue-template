<script setup>
    import { onMounted, computed, ref, getCurrentInstance } from "vue";
    import { Modal } from "bootstrap";
    defineProps({
        id: String,
        title: {
            type: String,
            default: "<<Title goes here>>",
        },
        className: String
    });

    const hasFooter = computed(() => {
        const instance = getCurrentInstance();
        return instance.slots.footer !== undefined;
    });

    let modalEle = ref(null);
    let thisModalObj = null;

    onMounted(() => {
        thisModalObj = new Modal(modalEle.value);
    });

    function _show() {
        thisModalObj.show();
    }

    function _hide() {
        thisModalObj.hide();
    }

    defineExpose({ show: _show, hide: _hide });
</script>

<template>
    <teleport to="body">
        <div class="modal fade" :id="id" tabindex="-1" aria-labelledby=""
            aria-hidden="true" ref="modalEle">
            <div class="modal-dialog" :class="className">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">{{ title }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <slot name="body" />
                    </div>
                    <div v-if="hasFooter" class="modal-footer">
                        <slot name="footer"></slot>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>