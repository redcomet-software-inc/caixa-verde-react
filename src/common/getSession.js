import React, { Component } from 'react';
import request from './configApi.js';

let PagSeguroDirectPayment = window.PagSeguroDirectPayment

export let getCardToken = function(card){

    let card_number = card.card_number.value;
    let card_expmonth = card.card_expiry.value;
    let card_expyear = card.card_expiry.value;
    let card_cvv = card.cvc.value;
    console.log(card);
    return new Promise((resolve,reject) => {
        PagSeguroDirectPayment.createCardToken({
            cardNumber: card_number,
            brand: '',
            cvv: card_cvv,
            expirationMonth: card_expmonth,
            expirationYear: card_expyear,
            success: function (response) {

            },
            error: function (error) {

            },
            complete: function (complete) {

            }
        });
    });
};

export let getPaymentMethods = function() {
    return new Promise((resolve, reject) => {
        PagSeguroDirectPayment.getPaymentMethods({
            success: function(response) {
                console.log("success");
                console.log(response);
            },
            error: function(response) {
                console.log("error");
                console.log(response);
            },
            complete: function(response) {
                console.log("complete");
                console.log(response);
            }
        });
    });
}

export let senderHash = function() {
    return new Promise((resolve,reject) => {
        PagSeguroDirectPayment.onSenderHashReady(function(response){
            if(response.status == 'error') {
                console.log(response.message);
                return false;
            }
            var hash = response.senderHash; //Hash estará disponível nesta variável.
            console.log("hash");
            console.log(hash);
            console.log(response);
            getPaymentMethods();
        });
    });
}

export let setSession = function(session_id){
    return new Promise((resolve, reject) => {
        let session = PagSeguroDirectPayment.setSessionId(session_id);
        console.log(window);
        console.log("setSessionFunction");
        senderHash(window.PagSeguroDirectPayment)
        console.log(session_id);
        resolve(session);
        reject();
    });
}

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
        }).then(res => {

            setSession(res.id).then(res=>{
                console.log("setSession"); 
                console.log(res);
              });

            resolve(res);
        }).catch(err => {
            reject("Get Session Failed: " + err);
        });
    });
}