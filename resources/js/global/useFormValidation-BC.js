// useFormValidation.js
import { computed, ref } from "vue";

const useFormValidation = () => {
  const errors = ref({});

  const isEmpty = (fieldValue) => {
    return fieldValue === null || fieldValue === undefined || fieldValue === "";
  };

  const minLength = (fieldName, fieldValue, minValue) => {
    return fieldValue.length < minValue ? `Field ${fieldName} should have a minimum length of ${minValue}.` : '';
  };

  const maxLength = (fieldName, fieldValue, maxValue) => {
    return fieldValue.length > maxValue ? `Field ${fieldName} should have a maximum length of ${maxValue}.` : '';
  };

  const isEmail = (fieldValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(fieldValue);
  };

  const isFile = (fieldName, fieldValue) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.pdf|\.doc|\.docx)$/i;
    return allowedExtensions.exec(fieldValue) ? '' : `File type for ${fieldName} is not allowed.`;
  };

  const isNum = (fieldName, fieldValue) => {
    const isNumeric = /^\d+$/.test(fieldValue);
    return isNumeric ? '' : `Field ${fieldName} should contain only numeric characters.`;
  };

  const validateRequired = (fieldName, fieldValue) => {
    if (isEmpty(fieldValue)) {
      errors.value[fieldName] = errors.value[fieldName] || {};
      errors.value[fieldName].required = `Field ${fieldName} is required.`;
    } else {
      delete errors.value[fieldName]?.required;
    }
  };

  const validateMin = (fieldName, fieldValue, fieldMin) => {
    errors.value[fieldName] = errors.value[fieldName] || {};
    errors.value[fieldName].min = minLength(fieldName, fieldValue, fieldMin ? parseInt(fieldMin) : 3);
  };

  const validateMax = (fieldName, fieldValue, fieldMax) => {
    errors.value[fieldName] = errors.value[fieldName] || {};
    errors.value[fieldName].max = maxLength(fieldName, fieldValue, parseInt(fieldMax));
  };

  const validateEmail = (fieldName, fieldValue) => {
    errors.value[fieldName] = errors.value[fieldName] || {};
    errors.value[fieldName].email = isEmail(fieldValue) ? '' : `Please enter a valid email address for ${fieldName}.`;
  };

  const validateFile = (fieldName, fieldValue) => {
    errors.value[fieldName] = errors.value[fieldName] || {};
    errors.value[fieldName].file = isFile(fieldName, fieldValue);
  };

  const validateSize = (fieldName, fieldValue, value) => {
    errors.value[fieldName] = errors.value[fieldName] || {};
    errors.value[fieldName].size = maxLength(fieldName, fieldValue, parseInt(value));
  };

  const validatePhoneField = (fieldName, fieldValue) => {
    errors.value[fieldName] = errors.value[fieldName] || {};
    errors.value[fieldName].phone = isNum(fieldName, fieldValue);
  };

  const submitValidation = (formElement, dataField) => {
    const isValid = computed(() => {
      return Object.keys(dataField).reduce((result, fieldName) => {
        const fieldValue = dataField[fieldName];
        const elementInput = formElement.querySelector(`input#${fieldName}`);
        const attributeNames = elementInput.getAttributeNames();
  
        if (attributeNames.includes('required')) {
          validateRequired(fieldName, fieldValue);
        }
  
        if (attributeNames.includes('min')) {
          const fieldMin = elementInput.getAttribute('min');
          validateMin(fieldName, fieldValue, fieldMin);
        }
  
        if (attributeNames.includes('max')) {
          const fieldMax = elementInput.getAttribute('max');
          validateMax(fieldName, fieldValue, fieldMax);
        }
  
        if (attributeNames.includes('type')) {
          switch (elementInput.getAttribute('type')) {
            case "email":
              validateEmail(fieldName, fieldValue);
              break;
            case "file":
              validateFile(fieldName, fieldValue);
              break;
            // Add more cases for other input types as needed
          }
        }
  
        return result && Object.keys(errors.value[fieldName] || {}).length === 0;
      }, true);
    })
    return { isValid };
  };

  return {
    errors,
    validateRequired,
    validateMin,
    validateMax,
    validateEmail,
    validateFile,
    validateSize,
    validatePhoneField,
    submitValidation,
  };
};

export default useFormValidation;
