import request from './config-api.js';

export let getAdmRegions = function(order_id) {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    console.log("order id ta funcionando aqui");
    console.log(order_id);
    return new Promise((resolve, reject) => {
    const data = {
        url:'/api/v1/adm_regions.json',
        method:'get',
        params: { 
            client_email: email,
            client_token: token,
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