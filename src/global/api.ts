import axios from 'axios';
import {VARIAVEIS} from './parametros';


const OAuthGoogleInfos = {
    CLIENT_ID: '19918590573-m2k3b72f7jq816hvu3rcucov4itvjvji.apps.googleusercontent.com',
    REDIRECT_URL: 'https://auth.expo.io/@mboldrini/fisioevolui',
    RESPONSE_TYPE: 'token'
}

function api(token?: string){
    console.log("URL: "+ VARIAVEIS.apiUrl);
    if(token){
        return axios.create({
            baseURL: VARIAVEIS.apiUrl,
            headers: {'Authorization': 'Bearer '+ token },
            timeout: 2 * 60 * 5000
        });  
    }
    return axios.create({
        baseURL: VARIAVEIS.apiUrl,
        timeout: 2 * 60 * 5000
    });  
}

export { api, OAuthGoogleInfos };


