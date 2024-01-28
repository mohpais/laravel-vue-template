<template>
    <div v-if="type === 'horizontal'" class="row" :class="className">
        <label :for="props.id" class="col-sm-2 col-form-label">{{ props.labelName }}</label>
        <div class="col-sm-10">
            <slot></slot>
        </div>
    </div>
    <div v-else :class="className">
        <label :for="props.id" class="col-form-label">{{ props.labelName }}</label>
        <slot></slot>
    </div>
</template>

<script setup>
    const props = defineProps({
        id: String,
        type: {
            type: String,
            default: ""
        },
        className: String,
        labelName: String
    });
</script>