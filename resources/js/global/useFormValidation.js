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
      errors.value[fieldName] = `Field ${fieldName} is required.`;
    } else {
      delete errors.value[fieldName];
    }
  };

  const validateMin = (fieldName, fieldValue, fieldMin) => {
    errors.value[fieldName] = minLength(fieldName, fieldValue, fieldMin ? parseInt(fieldMin) : 3);
  };

  const validateMax = (fieldName, fieldValue, fieldMax) => {
    errors.value[fieldName] = maxLength(fieldName, fieldValue, parseInt(fieldMax));
  };

  const validateEmail = (fieldName, fieldValue) => {
    errors.value[fieldName] = isEmail(fieldValue) ? '' : `Please enter a valid email address for ${fieldName}.`;
  };

  const validateFile = (fieldName, fieldValue) => {
    errors.value[fieldName] = isFile(fieldName, fieldValue);
  };

  const validateSize = (fieldName, fieldValue, value) => {
    errors.value[fieldName] = maxLength(fieldName, fieldValue, parseInt(value));
  };

  const validatePhone = (fieldId, value) => {
    // Phone number validation logic
    const regex = /^[0-9]{10}$/; // Adjust the regex based on your phone number format
    if (!regex.test(value)) {
      errors.value[fieldId] = "Invalid phone number format (at least 10 number)";
    } else {
      delete errors.value[fieldId];
    }
  };

  const validatePassword = (fieldId, value) => {
    // Password validation logic
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regex.test(value)) {
      errors.value[fieldId] = "Password must be at least 8 characters long and contain at least one letter and one digit.";
    } else {
      delete errors.value[fieldId];
    }
  };

  const validateRePassword = (fieldId, password, repassword) => {
    // errors.value[fieldId] = password === repassword ? '' : 'Passwords do not match.'
    if (password !== repassword) {
      errors.value[fieldId] = 'Passwords do not match.';
    } else {
      delete errors.value[fieldId];
    }
  };

  const submitValidation = (formElement, dataField) => {
    // console.log(dataField);
    const isValid = computed(() => {
      return Object.keys(dataField).reduce((result, fieldName) => {
        const fieldValue = dataField[fieldName];
        const elementInput = formElement.querySelector(`#${fieldName}`);
        if (!elementInput) {
          const radioInputs  = formElement.querySelectorAll(`input[type="radio"][name="${fieldName}"]`); // Replace "yourRadioGroupName" with your actual radio button group name
          if (radioInputs.length > 0) {
            let checked = Array.from(radioInputs).some(input => input.checked);
            if (!checked) {
              validateRequired(fieldName, "");
              const elementLabel = formElement.querySelector(`#${fieldName}-label`);
              elementLabel.classList.remove("d-block");
              elementLabel.innerHTML = "";
              // Check if there are errors for the current field
              if (errors.value[fieldName]) {
                // Add "is-invalid" class if there are errors
                radioInputs.forEach(element => {
                  element.classList.add("is-invalid");
                });
                // radioInputs[0].classList.add("is-invalid");
                elementLabel.classList.add("d-block");
                elementLabel.innerHTML = errors.value[fieldName];
              }
            }
          }

          return true;
        }
        const elementLabel = formElement.querySelector(`#${fieldName}-label`);
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
            case "tel":
              validatePhone(fieldName, fieldValue);
              break;
            case "password":
              // validatePassword(fieldName, fieldValue);
              if (fieldName !== 'repassword') {
                validatePassword(fieldName, fieldValue);
              } else {
                validateRePassword(fieldName, dataField['password'], fieldValue)
              }
              break;
            // Add more cases for other input types as needed
          }
        }
        if (fieldValue === "" && !attributeNames.includes('required')) {
          delete errors.value[fieldName];
        }
        // Show Up Error Warning
        elementInput.classList.remove("is-invalid");
        elementLabel.innerHTML = "";
        // Check if there are errors for the current field
        if (errors.value[fieldName]) {
          // Add "is-invalid" class if there are errors
          elementInput.classList.add("is-invalid");
          elementLabel.innerHTML = errors.value[fieldName];
        }

        return result && !errors.value[fieldName];
      }, true);
    })

    // Additional validation for re-entered password
    // if (dataField.password && dataField.repassword) {
    //   validateRePassword(dataField.password, dataField.repassword);
    // }

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
    validatePhone,
    validatePassword,
    validateRePassword,
    submitValidation
  };
};

export default useFormValidation;
