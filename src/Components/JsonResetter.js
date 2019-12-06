 const formJsonResetter = (params) => {
    params.forEach((element,index)=>{
      if(params[index].config.elementType !== "subheading" && params[index].config.elementType !== "multiple-add")
      {
        params[index].config.value = "";
        params[index].config.valid = true;
        params[index].config.helperText = "";
      }

    });
    return params;
  }

  export default formJsonResetter;