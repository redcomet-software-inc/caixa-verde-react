import React, { Component } from 'react';
import request from './config-api.js';

export let getSession = function() {
    return new Promise((resolve, reject) => {

        const pagseguro_email = 'guilhermewnunes@gmail.com' ;
        const pagseguro_token = process.env.REACT_PAGSEGURO_TOKEN;
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
            console.log("ACEITOU TOKEN");
            resolve(res);
            return
        }).catch(err => {
            console.log("NEGOU TOKEN");
            reject("Get Session Failed: " + err);
            return
        });
    });
}