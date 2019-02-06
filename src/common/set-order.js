
import request from './config-api.js';

export let setOrder = function(params) {
    return new Promise((resolve, reject) => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    const file = {
        url:'/api/v1/orders.json',
        method:'post',
        params: {
            client_email: email,
            client_token: token,
        },
        data: params,
        header: {
            'X-Client-Email': email,
            'X-Client-Token': token,
        },
    }
    request(file).then( success => {
        resolve(success);
    }).catch( err => {
        reject( err )
    });

    });
}