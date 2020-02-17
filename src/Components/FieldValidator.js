function checkValidity(value, rules) {
    let validityObj = { isValid: true, errorText: "" };
    if(Array.isArray(value))
    {
      value = value.toString();
      
    }

if(Object.entries(rules).length !== 0)
{
  if (rules.required.value) {
    validityObj.isValid = value.trim() !== "" && validityObj.isValid;
    validityObj.errorText =
      value.trim() !== "" ? validityObj.errorText : `* ${rules.required.msg}`;
  }

  if (rules.minLength && value.trim() !== "") {
    validityObj.isValid =
      value.length >= rules.minLength.value && validityObj.isValid;
    validityObj.errorText =
      value.length >= rules.minLength.value
        ? validityObj.errorText
        : `* ${rules.minLength.msg}`;
  }

  if (rules.maxLength && value.trim() !== "") {
    validityObj.isValid =
      value.length <= rules.maxLength.value && validityObj.isValid;
    validityObj.errorText =
      value.length <= rules.maxLength.value
        ? validityObj.errorText
        : `* ${rules.maxLength.msg}`;
  }

  if (rules.isEmail && value.trim() !== "") {
    let regex = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/;

    validityObj.isValid = regex.test(value) && validityObj.isValid;
    validityObj.errorText = regex.test(value)
      ? validityObj.errorText
      : `* ${rules.isEmail.msg}`;
  }
  if (rules.isDigit && value.trim() !== "") {
    let regex = /^\d+$/;

    validityObj.isValid = regex.test(value) && validityObj.isValid;
    validityObj.errorText = regex.test(value)
      ? validityObj.errorText
      : `* ${rules.isDigit.msg}`;
  }
  if (rules.isAlpha && value.trim() !== "") {
    let regex = /^[a-zA-Z]+$/;

    validityObj.isValid = regex.test(value) && validityObj.isValid;
    validityObj.errorText = regex.test(value)
      ? validityObj.errorText
      : `* ${rules.isAlpha.msg}`;
  }

}


    return validityObj;
}
  
  export default checkValidity;
  