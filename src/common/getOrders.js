
import request from './configApi.js';

export let getOrders = function(order_id) {
    return new Promise((resolve, reject) => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    let new_order_id = order_id;
    let order_id_url = "";
    if(!new_order_id===0)
    {
        order_id_url= "?order_id" + order_id + "&" ;
    } 

    const data = {
        url:'/api/v1/orders/1.json' + order_id_url ,
        method:'get',
        params:
        { 
        client_email: email,
        client_token: token,
        },
        header:
        {
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