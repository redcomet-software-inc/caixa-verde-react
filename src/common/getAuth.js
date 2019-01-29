import request from './configApi.js';
import { getLocalStorage } from '../features/home/SetLocalStorage.js';

/* Check if User has Authorization to Access Restrict Pages */
export let getAuth = function() {
    return new Promise((resolve, reject) => {
        const credentials = getLocalStorage();

        if(credentials) {
            request({
                method:'get',
                url: 'api/v1/sessions/check.json',
                params: {
                    client_email: credentials.email,
                    client_token: credentials.token,
                },
            }).then(res => {
                resolve(res);
            }).catch(error => {
                reject("Security Check Error: " + error);
            });
        } else {
            reject("Not Authorized, sorry.");
        }
    });
}