interface IAmbientParams{
    apiUrl: string;
}

const ambiente: string = "PROD";
const versaoAPP = "1.1.1.9";


let VARIAVEIS : IAmbientParams = {
    apiUrl: ''
};

const DEV_VARS: IAmbientParams = {
    apiUrl: 'http://192.168.15.108:3333'
}

const PROD_VARS: IAmbientParams = {
    apiUrl: 'http://api.fisioevolui.com.br'
}

if(ambiente == "DEV"){
    VARIAVEIS = DEV_VARS;
}else{
    VARIAVEIS = PROD_VARS;
}

console.log(VARIAVEIS);


export { VARIAVEIS, versaoAPP }