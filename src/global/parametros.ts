interface IAmbientParams{
    apiUrl: string;
}

const ambiente: string = "PROD";
const versaoAPP = "1.0.1.6";


let VARIAVEIS : IAmbientParams = {
    apiUrl: ''
};

const DEV_VARS: IAmbientParams = {
    apiUrl: 'http://192.168.15.108:3333'
}

const PROD_VARS: IAmbientParams = {
    apiUrl: 'http://fisioevolui.herokuapp.com'
}

if(ambiente == "DEV"){
    VARIAVEIS = DEV_VARS;
}else{
    VARIAVEIS = PROD_VARS;
}

console.log(VARIAVEIS);


export { VARIAVEIS, versaoAPP }