import React, { Component } from 'react';
import request from './configApi.js';

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
            resolve(res);
        }).catch(err => {
            reject("Get Session Failed: " + err);
        });
    });
}