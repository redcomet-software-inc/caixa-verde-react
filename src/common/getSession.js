import request from './configApi.js';

let PagSeguroDirectPayment = window.PagSeguroDirectPayment;

/* After Client Side, Back End Executes */
export let sendToApi = function(order_id) {
    return new Promise((resolve, reject) => {
        const client_email = localStorage.getItem("email");
        const client_token  = localStorage.getItem("token");
        request({
            url:'api/v1/pagseguro/payment.json',
            method:'post',
            params: {
                client_email: client_email,
                client_token: client_token,
                order_id: order_id,
            }
        }).then(response => 
         {
            resolve(response);
        }).catch(err => {
            reject("Failed to Send to Api" + err);
        });
    });
}

/* The First to be Executed by Get Session.js */
export let getCardToken = function(card) {
    return new Promise(function(resolve, reject) {
        startPaymentProcess(card).then( card_token => {
            console.log("Payment Process");
            resolve(card_token);
        }).catch(error => {
            console.log("Get Card Token Failed: " + error);
        });
    })
    
}

/* Chain with all ordered Promises */
let startPaymentProcess = function (card) {
    return new Promise(function(resolve, reject) {
        getSession().then(res => setSession(res.id)
                    .then(res => senderHash())
                    .then(res => getBrand(card.card_number.value))
                    .then(brand => createCardToken(card, brand))
                    .then(res => resolve(res)));
    })
}

/* 5. Create Card Token based on Session ID and User Hash */
export let createCardToken = function(card, brand) {
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
                console.log("Cardtoken Response");
                resolve(response.card.token);
            },
            error: function (error) {
                console.log(error);
                reject("Create Card Token Failed: "+ error);
            },
            complete: function (complete) {
                console.log("cardtoken complete");
                console.log(complete);
            }
        });
    });
}

/* 4.5 (Optional) Get PaymentMethods */
export let getPaymentMethods = function() {
    return new Promise((resolve, reject) => {
        PagSeguroDirectPayment.getPaymentMethods({
            success: function(response) {
                console.log("Get Payment Methods Success");
                resolve(response);
            },
            error: function(error) {
                console.log("Get Payment Methods Error");
                reject("Get Payment Methods Failed: " + error)
            },
            complete: function(response) {
                console.log("Get Payment Methods Complete");
                console.log(response);
            }
        });
    });
}

/* 4. Get Brand from Card Bin */
export let getBrand = function(card_number) {
    return new Promise((resolve, reject) => {
        let card_bin = card_number.toString(2).substring(0,6);
        PagSeguroDirectPayment.getBrand({
            cardBin: card_bin.toString(2),
            success: function(response) {
                console.log("Get Brand Success");
                return resolve(response.brand.name);
            },
            error: function(error) {
                console.log("Get Brand Err");
                return reject("Get Brande Failed: " + error);
            },
            complete: function(response) {
                console.log("complete brand");
                return response;
            }
        });
    });
}

/* 3. Create a Hash with User Data */
export let senderHash = function() {
    return new Promise((resolve,reject) => {
        console.log("Get Sender Hash");
        let sender_hash = PagSeguroDirectPayment.getSenderHash();
        resolve(sender_hash);
        reject("Get Sender Hash Failed: " + sender_hash);
    });
}

/* 2. Set Session with the Obtained Session ID */
export let setSession = function(session_id){
    return new Promise((resolve, reject) => {
        let session = PagSeguroDirectPayment.setSessionId(session_id);
        console.log(session_id);
        resolve(session);
        reject("Set Session Failed: " + session);
    });
}

/* 1. Get PagSeguro Session from Backend */
export let getSession = function() {
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
            console.log("Get Session");
            console.log(session);
            resolve(session);

        }).catch(err => 
         {
            reject("Get Session Failed: " + err);
        });
    });
}