<!-- MyTextareaInput.vue -->
<template>
    <div>
      <textarea
        v-bind="$attrs"
        ref="mytextarea"
        :id="props.id"
        :rows="rowspan"
        :cols="colspan"
        :name="props.name"
        :class="addClass"
        :placeholder="props.placeholder"
        :min="props.min"
        :max="props.max"
        :value="modelValue"
        @input="updateTextarea"
        :readonly="props.readonly"
        :disabled="props.disabled"
        :required="props.required"
        :aria-describedby="props.ariaDescribeby"
      ></textarea>
      <div :id="`${props.id}-label`" class="invalid-feedback" :for="props.id">
        {{ errors[props.id] }}
      </div>
    </div>
  </template>
  
<script setup>
  import { computed, ref, watch } from "vue";
  import useFormValidation from "@/global/useFormValidation";

  const props = defineProps({
    id: String,
    name: String,
    placeholder: String,
    className: String,
    readonly: Boolean,
    disabled: Boolean,
    rowspan: {
      type: String,
      default: "5"
    },
    colspan: {
      type: String,
      default: ""
    },
    modelValue: {
      type: String,
      required: false,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    ariaDescribeby: String,
  });

  const emit = defineEmits(["update:modelValue"]);

  const mytextarea = ref(null);
  const modelValue = ref(props.modelValue);

  const updateTextarea = (event) => {
    modelValue.value = event.target.value;
    emit("update:modelValue", event.target.value);
  };

  const { validateRequired, validateMin, validateMax, errors } = useFormValidation();

  const addClass = computed(() => {
    let className = "form-control mb-0 ";
    if (errors[props.id]) {
      className += "is-invalid ";
    }
    if (props.className) {
      className += props.className;
    }

    return className;
  });

  watch(modelValue, (newVal) => {
    if (props.required) {
      validateRequired(props.id, newVal);
    }

    if (props.min) {
      validateMin(props.id, newVal, props.min);
    }

    if (props.max) {
      validateMax(props.id, newVal, props.max);
    }

    let error = errors.value[props.id];
    const elementTextarea = mytextarea.value;
    elementTextarea.classList.remove("is-invalid");

    if (error) {
      elementTextarea.classList.add("is-invalid");
    }
  });
</script>
  