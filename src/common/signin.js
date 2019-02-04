import request from './config-api.js';

export let signIn = function(email, password) {
    return new Promise((resolve, reject) => {
        const data = {
            url:'api/v1/sessions.json',
            method:'post',
            params:
            { 
                email: email,
                password: password
            },
            header:
            {
            'Content-Type': 'application/json'
            },
        }
        request(data).then( success => {
            resolve(success);
        }).catch( error => {
            reject("Signin Error: " + error);
        });
    });

}