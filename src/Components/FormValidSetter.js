import checkValidity from "./FieldValidator";
const isFormValid = jsonform => {
  let formIsValid = true;
  let form = jsonform;

  form.forEach(element =>{
  
    if(element.config.elementType === "multiple-add")
    {
          element.config.fields.forEach(elem => {
              elem.forEach(field => {
              let getValidity = checkValidity(field.config.value, field.config.validation);
              field.config.valid = getValidity.isValid;
              field.config.helperText = getValidity.errorText;
              field.config.touched = 1;
              formIsValid = field.config.valid && formIsValid;
              })
           });

    }
    else
    {
      let getValidity = checkValidity(element.config.value, element.config.validation);
      element.config.valid = getValidity.isValid;
      element.config.helperText = getValidity.errorText;
      element.config.touched = 1;
      formIsValid = element.config.valid && formIsValid;
    }

  }
);

  return { formValidity: formIsValid, validatedForm: form };
};
export default isFormValid;
