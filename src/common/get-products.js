import request from './config-api.js';

export let getProducts = function() {
    return new Promise((resolve, reject) => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        const data = {
            url:'/api/v1/products.json',
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

export let getKits = function() {
    return new Promise((resolve, reject) => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        const data = {
            url:'/api/v1/kits.json',
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

export let getProduct = function(product_id) {
    return new Promise((resolve, reject) => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        const data = {
            url:'/api/v1/products/'+ product_id  + '.json',
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

export let getKit = function(kit_id) {
    return new Promise((resolve, reject) => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        const data = {
            url:'/api/v1/kits/'+ kit_id  + '.json',
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