
import request from './config-api.js';

export let getOrders = function(card_hash, order_id) {
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
        url:'/api/v1/payments.json',
        method:'post',
        params:
        { 
        client_email: email,
        client_token: token,
        card_hash: card_hash,
        order_id: order_id
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