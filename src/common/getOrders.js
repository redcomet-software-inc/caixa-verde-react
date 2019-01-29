
import request from './configApi.js';

export let getOrders = function(order_id) {
    return new Promise((resolve, reject) => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    const data = {
        url:'/api/v1/orders.json',
        method:'get',
        params: { 
        client_email: email,
        client_token: token,
        order_id: order_id,
        },
        header:
        {
        'X-Client-Email': email,
        'X-Client-Token': token,
        },
    }

    request(data).then( success => {
        console.log("success");
        console.log(success);
        resolve(success);
    }).catch( err => {
        reject( err )
    });

    });
}