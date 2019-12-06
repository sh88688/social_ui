const fetchCall = async (url, options, type) =>
    {
      const response = await fetch(url, options);

      switch(type)
      {
        case "text":
          return response.text();
          
        case "json":
          return response.json();  
          
        default :
        return response.text();
        
      }
    };
export default fetchCall;