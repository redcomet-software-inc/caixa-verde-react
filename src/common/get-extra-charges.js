import request from './config-api.js';

export let getFreight = function() {
    console.log("chegou aqui");
    return new Promise((resolve, reject) => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        const data = {
            url:'/api/v1/freight.json',
            method:'get',
            params: { 
                client_email: email,
                client_token: token,
            },
            header: {
            'X-Client-Email': email,
            'X-Client-Token': token,
            },
        }

        request(data).then( success => {
            resolve(success);
        }).catch( err => {
            reject( err );
        });
    });
}



