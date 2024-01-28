<template>
    <div :class="className">
        <label :for="id" class="col-form-label fw-bold d-block position-relative">{{ labelName ?? helpers.toTitleCase(id) }}<span v-if="required && showRequired" class="text-danger fz-12 position-absolute" style="top: 3px">*</span></label>
        <MyInput 
            v-if="type === 'text' || type === 'number' || type === 'tel' || type === 'password' || type === 'email' || type === 'date'" 
            v-bind="$attrs"
            :id="id"
            :name="id"
            v-model="modelValue"
            :type="type"
            @input="updateInput"
            :placeholder="placeholder"
            :required="required"
        />
        <div v-else-if="type === 'radio'">
            <div class="">
                <MyInput 
                    v-bind="$attrs"
                    v-for="(option, key) in props.options"
                    :key="key"
                    :id="option.value"
                    :name="id"
                    :labelName="option.label"
                    v-model="modelValue"
                    :checked="modelValue === option.value"
                    :type="type"
                    :className="className"
                    @change="updateRadio(option.value)"
                    :required="required"
                    :disabled="props.disabled"
                />
                <div :id="`${id}-label`" class="invalid-feedback" :for="id"></div>
            </div>
        </div>
        <MySelect 
            v-else-if="type === 'select'"
            v-bind="$attrs"
            :id="id"
            :name="id"
            v-model="modelValue"
            @input="updateInput"
            :options="options"
            :required="required"
            :ariaDescribeby="ariaDescribeby"
        />
        <MyTextarea 
            v-else-if="type === 'textarea'"
            v-bind="$attrs"
            :id="id"
            :name="id"
            v-model="modelValue"
            @input="updateInput"
            :required="required"
            :rowspan="rowspan"
            :colspan="colspan"
            :ariaDescribeby="ariaDescribeby"
        />
    </div>
</template>

<script setup>
    /** Import package */
    import { ref, computed } from "vue";
    /** Import component */
    import MyInput from '@/components/atoms/MyInput.vue';
    import MySelect from '@/components/atoms/MySelect.vue';
    import MyTextarea from "@/components/atoms/MyTextarea.vue";
    /** Import global */
    import helpers from '@/global/helpers';

    /** define props */
    const props = defineProps({
        id: String,
        labelName: String,
        rowspan: String,
        colspan: String,
        type: {
            type: String,
            default: "text"
        },
        className: {
            type: String,
            default: ""
        },
        direction: {
            type: String,
            default: ""
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        showRequired: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        numberFormat: {
            type: Boolean,
            default: false,
        },
        ariaDescribeby: {
            type: String,
            default: null,
        },
        numericOnly: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: ""
        },
        modelValue: {
            type: [String, Number],
            required: false,
            default: "",
        },
        options: {
            type: Array,
            default: () => [],
        },
    });

    const emit = defineEmits(["update:modelValue"]);

    // const modelValue = ref(props.modelValue);
    const modelValue = computed({
        get: () => props.modelValue,
        set: (value) => emit("update:modelValue", value),
    });;

    const updateInput = (event) => {
        modelValue.value = event.target.value;
        emit("update:modelValue", event.target.value);
    };

    const updateRadio = (value) => {
        modelValue.value = value;
        emit("update:modelValue", value);
    };
</script>