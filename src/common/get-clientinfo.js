
import request from './config-api.js';

export let getClientInfo = function() {
    return new Promise((resolve, reject) => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    
    const data = {
      url:'/api/v1/clients/1.json',
      method:'get',
      params: { 
        client_email: email,
        client_token: token
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