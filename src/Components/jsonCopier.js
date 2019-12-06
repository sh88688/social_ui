const formElementCopier = (params) => {
    params.forEach((element,index)=>{
        params[index].id = params[index].id
        params[index].config.value = "";
        params[index].config.valid = true;
        params[index].config.elementConfig.helperText = "";

    });
    return params;
  }

  export default formElementCopier;