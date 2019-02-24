
import request from './config-api.js';

export let setField = function(table, field, value) {
    return new Promise((resolve, reject) => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    console.log("field - value");
    console.log(field);
    console.log(value);
    console.log(table);
    
    
    const data = {
      url:'/api/v1/update_field.json',
      method:'PUT',
      params: {
        client_email: email,
        client_token: token,
        table,
        field,
        value,
      },
      header:{
        'X-Client-Email': email,
        'X-Client-Token': token,
        'Content-Type': 'application/json'
      },
    }

    request(data).then( success => {
      resolve(success);
    }).catch( err => {
      reject( err )
    });

  });
}