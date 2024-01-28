<!-- MySelectInput.vue -->
<template>
  <div>
    <select 
      v-bind="$attrs"
      ref="myselect"
      :id="props.id"
      :name="props.name"
      :class="addClass"
      :value="modelValue"
      @input="updateSelect"
      :disabled="props.disabled"
      :required="props.required"
      :aria-describedby="props.ariaDescribeby"
    >
      <option value="" selected disabled>{{ props.placeholder }}</option>
      <option v-for="option in props.options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
    <div :id="`${props.id}-label`" class="invalid-feedback" for="props.id">
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
    className: String,
    placeholder: {
      type: String,
      default: "-- Select an option --"
    },
    modelValue: {
      type: [String, Number, Array],
      required: false,
      default: "",
    },
    disabled: Boolean,
    required: Boolean,
    ariaDescribeby: String,
    options: {
      type: Array,
      default: () => [],
    },
  });

  const emit = defineEmits(["update:modelValue"]);

  const myselect = ref(null);
  // const modelValue = ref(props.modelValue);
  const modelValue = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
  });

  const updateSelect = (event) => {
      modelValue.value = event.target.value;
      emit("update:modelValue", event.target.value);
    };
  
  // const updateSelect = computed({
  //   get: () => props.modelValue,
  //   set: (value) => emit("update:modelValue", value),
  // });

  const { validateRequired, errors } = useFormValidation();

  const addClass = computed(() => {
    let className = "form-select mb-0 ";
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

    let error = errors.value[props.id];
    const elementSelect = myselect.value;
    elementSelect.classList.remove("is-invalid");

    if (error) {
      elementSelect.classList.add("is-invalid");
    }
  });
</script>
  