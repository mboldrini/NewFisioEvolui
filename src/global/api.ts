import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://192.168.15.108:3333',
//     headers: {'Authorization': 'Bearer '+ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMjU0NTI4NTg5NTY3NDE3OTM3OSIsImVtYWlsIjoiZXF1aXBldmljaW9ickBnbWFpbC5jb20iLCJpYXQiOjE2NDg5MTk5ODIsImV4cCI6MTY0OTAwNjM4Mn0.H8KBsDucKwQKvgm5-fZoOkK7E_0dz7F-5r5HiQ2qcK8"}
// });

function api(token: string){
    return axios.create({
        baseURL: 'http://192.168.15.108:3333',
        headers: {'Authorization': 'Bearer '+ token }
    });  
}

export { api };


