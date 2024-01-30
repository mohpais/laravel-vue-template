<template>
  <div v-if="props.type === 'radio'" :class="addClass">
      <label >
        <input 
          v-bind="$attrs"
          ref="myinput"
          :id="props.id"
          class="form-check-input" 
          type="radio" 
          :value="modelValue" 
          :name="props.name" 
          @change="updateInput"
          :checked="props.checked"
          :disabled="props.disabled"
          :required="props.required"
          autocomplete="off"
        />
        <span class="form-check-label">{{ labelName }}</span>
      </label>
  </div>
  <div v-else-if="props.type === 'date'">
    <flat-pickr
      v-bind="$attrs"
      :id="props.id"
      :name="props.name"
      v-model="modelValue"
      :config="config"
      @input="updateInput"
      :class="addClass"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :required="props.required"
    />
  </div>
  <div v-else :class="{
    'position-relative': type === 'password'
  }">
    <input
        v-bind="$attrs"
        ref="myinput"
        :id="props.id"
        :name="props.name"
        :type="props.type !== 'password' ? props.type : !showPass ? 'password' : 'text'"
        :class="addClass"
        :placeholder="props.placeholder"
        :min="props.min"
        :max="props.max"
        :value="modelValue"
        @input="updateInput"
        :readonly="props.readonly"
        :disabled="props.disabled"
        :required="props.required"
        :aria-describedby="props.type !== 'password' ? props.ariaDescribeby : 'password-show-hide'"
      />
      <i v-if="type === 'password' && !showPass" @click="showPass = true" class="bi bi-eye-fill" 
          style="position: absolute; right: 10px; top: 7px;"></i>
      <i v-if="type === 'password' && showPass" @click="showPass = false" class="bi bi-eye-slash-fill"
          style="position: absolute; right: 10px; top: 7px;"></i>
      <div :id="`${props.id}-label`" class="invalid-feedback" :for="props.id">
        {{ errors[props.id] }}
      </div>
  </div>
</template>

<script setup>
    import { computed, ref, watch } from "vue";
    import flatPickr from 'vue-flatpickr-component';

    import useFormValidation from "@/global/useFormValidation";

    const props = defineProps({
      id: String,
      name: String,
      type: String,
      min: String,
      max: String,
      placeholder: String,
      className: String,
      readonly: Boolean,
      checked: {
        type: Boolean,
        default: false,
      },
      disabled: Boolean,
      modelValue: {
        type: [String, Number],
        required: false,
        default: "",
      },
      required: {
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
      className: {
          type: String,
          default: ""
      },
      numericOnly: {
        type: Boolean,
        default: false,
      },
      labelName: {
        type: String,
        default: "",
      },
      rules: {
        type: Array,
        default: []
      }
    });
    
    const config = ref({
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: 'M j, Y',
        altInput: true,
        dateFormat: 'Y-m-d',
        // locale: Hindi, // locale for this instance only          
    });
    let showPass = ref(false); 

    const emit = defineEmits(["update:modelValue"]);

    const myinput = ref(null);
    // const modelValue = ref(props.modelValue);
    const modelValue = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const updateInput = (event) => {
      modelValue.value = event.target.value;
      emit("update:modelValue", event.target.value);
    };
    // const updateInput = computed({
    //   get: () => props.modelValue,
    //   set: (value) => emit("update:modelValue", value),
    // });

    const {
      validateRequired,
      validateMin,
      validateMax,
      validateEmail,
      validatePhone,
      validateFile,
      validatePassword,
      validateRePassword,
      errors
    } = useFormValidation();

    const addClass = computed(() => {

      let className;
      switch (props.type) {
        case "radio":
          className = "form-check mb-0 "
          break;
        default:
          className = "form-control mb-0 "
          break;
      }
      
      if (errors[props.id]) {
        className += "is-invalid ";
      }
      if (props.className) {
        className += props.className;
      }

      return className;
    });

    watch(modelValue, (newVal) => {
      switch (props.type) {
          case "radio":
            validateRequired(props.id, newVal);
            // Radio buttons don't need validation
            break;
          case "email":
            validateEmail(props.id, newVal);
            break;
          case "file":
            validateFile(props.id, newVal);
            break;
          case "tel":
            validatePhone(props.id, newVal);
            break;
          case "password":
            if (props.id !== 'repassword') {
              validatePassword(props.id, newVal);
            } else {
              let inputpassword = document.querySelector("input#password")
              // console.log(inputpassword.value);
              validateRePassword(props.id, newVal, inputpassword.value)
            }
            break;
          default:
            if (props.required) {
              validateRequired(props.id, newVal);
            }
            if (props.min) {
              validateMin(props.id, newVal, props.min);
            }
            if (props.max) {
              validateMax(props.id, newVal, props.max);
            }
            break;
        }

        let error = errors.value[props.id]
        const elementInput = myinput.value;
        // Remove existing "is-invalid" class
        elementInput.classList.remove("is-invalid");
        
        // Check if there are errors for the current field
        if (error) {
          // Add "is-invalid" class if there are errors
          elementInput.classList.add("is-invalid");
          
        }
    });
</script>

<style>
  i {
    cursor: pointer !important;
  }
  
  input[aria-describedby="password-show-hide"].form-control.is-invalid {
    background-position: right 1.75rem center,center right 2.25rem !important;
  }
</style>
