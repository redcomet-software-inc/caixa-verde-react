
import request from './config-api.js';

export let getPagseguroTransaction = function(orderId) {
    return new Promise((resolve, reject) => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const data = {
        url:'/api/v1/orders/' + orderId + '/order_statuses/1.json',
        method:'get',
        params: { 
        client_email: email,
        client_token: token,
        order_id: orderId,
        },
        header:
        {
            'X-Client-Email': email,
            'X-Client-Token': token,
        },
    }
    request(data).then( success => {
        /* Get XML from Server */
        /* Parsing to JSON */
        var parseString = require('xml2js').parseString;
        var xml = success;
        parseString(xml, function (err, result) {
            console.dir(result.transaction);
            return resolve(result.transaction);
        });
        return resolve (success);

    }).catch( err => {
        reject( err )
    });

    });
}