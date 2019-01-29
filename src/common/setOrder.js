
import request from './configApi.js';

export let setOrder = function(params) {
    return new Promise((resolve, reject) => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    console.log("Set Order");
    console.log("DATA");
    console.log(params);

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
        console.log(success);
        resolve(success);
    }).catch( err => {
        console.log(err);
        reject( err )
    });

    });
}