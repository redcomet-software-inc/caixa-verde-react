import request from './config-api.js';

const email = localStorage.getItem("email");
const token = localStorage.getItem("token");

export let getOrderInfo = function(order_id) {
    return new Promise((resolve, reject) => {
    const data = {
        url:'/api/v1/orders/1.json',
        method:'get',
        params: { 
            client_email: email,
            client_token: token,
            order_id: order_id,
        }, header: {
        'X-Client-Email': email,
        'X-Client-Token': token,
        },
    }
    request(data).then( success => {
        resolve(success);
    }).catch( err => {
        reject( err )
    });

 });
}

export let getOrders = function() {
    return new Promise((resolve, reject) => {

    const data = {
        url:'/api/v1/orders.json',
        method:'get',
        params: { 
        client_email: email,
        client_token: token,
        },
        header:
        {
        'X-Client-Email': email,
        'X-Client-Token': token,
        },
    }

    request(data).then( success => {
        resolve(success);
    }).catch( err => {
        reject( err )
    });

    });
}

export let getPayment = function(order_id) {
    return new Promise((resolve, reject) => {
    const data = {
        url:'/api/v1/payments/1.json',
        method:'get',
        params: { 
            client_email: email,
            client_token: token,
            order_id: order_id,
        }, header: {
        'X-Client-Email': email,
        'X-Client-Token': token,
        },
    }
    request(data).then( success => {
        resolve(success);
    }).catch( err => {
        reject( err )
    });
 });
}