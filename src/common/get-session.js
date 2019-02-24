import request from './config-api.js';
import { setPaymentCard } from './set-payment.js';

let PagSeguroDirectPayment = window.PagSeguroDirectPayment;

/* After Client Side, Back End Executes */
let sendToApi = function(order_id, token, hash, brand) {
    console.log("Result");
    console.log("Order ID");
    console.log(order_id);
    console.log("Token");
    console.log(token);
    console.log("Hash");
    console.log(hash);
    console.log("brand");
    console.log(brand);

    if (order_id && token && hash && brand) {
        return new Promise((resolve, reject) => {
            setPaymentCard(order_id, hash, token)
            .then(response => {
                resolve(response);
            }).catch(err => {
                reject("Failed to Send to Api" + err);
            });
        });
    } else {
        throw new Error("Failed to Gather all Data... Sorry.");
    }
}

/* Chain with all ordered Promises */
export let startPaymentProcess = function (card, order_id) {
    let _sender_hash = "";
    let _brand = "";
    return new Promise((resolve,reject) => {
        getSession()
        .then(res => { return setSession(res.id)} )
        .then(res => { return senderHash()} )
        .then(sender_hash => { _sender_hash = sender_hash; return getBrand(card.card_number.value)})
        .then(brand => { _brand = brand; return createCardToken(card, brand)})
        .then(card_token => { return sendToApi(order_id, card_token, _sender_hash, _brand) })
        .then(response => { return resolve(response) })
        .catch(err => { return reject("Failed: " + err) });
    });

}

/* 5. Create Card Token based on Session ID and User Hash */
let createCardToken = function(card, brand) {
    let card_number = card.card_number.value;
    let card_expmonth = card.expiry_month.value;
    let card_expyear = card.expiry_year.value;
    let card_cvv = card.cvc.value;
    return new Promise((resolve,reject) => {
        PagSeguroDirectPayment.createCardToken({
            cardNumber: card_number,
            brand: brand,
            cvv: card_cvv,
            expirationMonth: card_expmonth,
            expirationYear: card_expyear,
            success: function (response) {
                resolve(response.card.token);
            },
            error: function (error) {
                console.log(error);
                reject("Create Card Token Failed: "+ error);
            },
        });
    });
}

/* 4. Get Brand from Card Bin */
    let getBrand = function(card_number) {
    return new Promise((resolve, reject) => {
        let card_bin = card_number.toString(2).substring(0,6);
        PagSeguroDirectPayment.getBrand({
            cardBin: card_bin.toString(2),
            success: function(response) {
                console.log(response);
                resolve(response.brand.name);
            },
            error: function(error) {
                reject("Get Brande Failed: " + error);
            },
        });
    });
}

/* 3. Create a Hash with User Data */
    let senderHash = function() {
    return new Promise((resolve,reject) => {
        let sender_hash = PagSeguroDirectPayment.getSenderHash();
        if(sender_hash) {
            resolve(sender_hash);
        } else {
            reject("Get Sender Hash Failed: " + sender_hash);
        }
    });
}

/* 2. Set Session with the Obtained Session ID */
    let setSession = function(session_id){
    return new Promise((resolve, reject) => {
        let session = PagSeguroDirectPayment.setSessionId(session_id);
        resolve(session);
        reject("Set Session Failed: " + session);

    });
}

/* 1. Get PagSeguro Session from Backend */
    let getSession = function() {
    return new Promise((resolve, reject) => {
        const pagseguro_email = 'guilhermewnunes@gmail.com' ;
        const pagseguro_token = '3774B1301F034CDAA8900429ACCB394B';
        const client_email = localStorage.getItem("email");
        const client_token  = localStorage.getItem("token");
        request({
            url:'api/v1/pagseguro/session.json',
            method:'get',
            params: {
                client_email: client_email,
                client_token: client_token,
                pagseguro_email: pagseguro_email,
                pagseguro_token: pagseguro_token,
            }
        }).then(session => 
         {
            resolve(session);

        }).catch(err => 
         {
           reject("Get Session Failed: " + err);
        });
    });
}

/* 4.5 (Optional) Get PaymentMethods
    let getPaymentMethods = function() {
    return new Promise((resolve, reject) => {
        PagSeguroDirectPayment.getPaymentMethods({
            success: function(response) {
                resolve(response);
            },
            error: function(error) {
                reject("Get Payment Methods Failed: " + error)
            },
        });
    });
}
 */