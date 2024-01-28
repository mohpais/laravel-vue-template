<!-- MyFormProvider.vue -->
<template>
  <form ref="formProvider" :id="props.id" @submit.prevent="onSubmit" autocomplete="off" novalidate>
    <slot />
  </form>
</template>

<script setup>
  import { ref } from "vue";
  import useFormValidation from "@/global/useFormValidation";

  const props = defineProps({
    id: String,
    formData: {
      type: Object,
      default: {},
    },
  });

  const formProvider = ref(null);
  const formValidation = useFormValidation();

  const emits = defineEmits(["onSubmit"]);

  const onSubmit = () => {
    let isValid = formValidation.submitValidation(formProvider.value, props.formData).isValid.value;
    // console.log(formValidation.errors.value);
    return emits('onSubmit', isValid);
  };
</script>
