import request from './configApi.js';

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
            console.log("Signin Res");
            console.log(success);
            resolve(success);
        }).catch( err => {
            console.log("Signin Error");
            console.log(err);
            reject( err );
        });
    });

}