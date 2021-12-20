import router from '../router';
import { server } from '../services/constants'
import httpClient from './httpClient'

//เช็คว่า Login อยู่หรือเปล่า
const isLoggedIn = () => {
    let token = localStorage.getItem(server.TOKEN_KEY);
    return token != null;
}


const login = async(values) => {
    let result = await httpClient.post(server.LOGIN_URL, values);
    if (result.data.result == "ok") {
        // console.log((Number(values.username) * 151) / 4);
        // console.log(result.data.token);
        // console.log(result.data);
        // console.log(Number((1234 * 151)));
        // (1234 * 151) / 4
        if (result.data.token === (1234 * 151)) {
            localStorage.setItem(server.USERNAME, values.username);
            localStorage.setItem(server.FULLNAME, result.data.fullName);
            localStorage.setItem(server.TOKEN_KEY, result.data.token);
            localStorage.setItem(server.PolicyCode, result.data.PolicyCode);
            localStorage.setItem(server.PolicyName, result.data.PolicyName);
            localStorage.setItem(server.EmpPict, result.data.EmpPict);
            localStorage.setItem(server.FACTORY, result.data.Factory);
            localStorage.setItem(server.APPOVE, result.data.Appove);
            // console.log(result.data.PolicyName)
            await router.push("/home");
            return true;
        } else {
            alert('Token Error')
        }
    } else {
        alert(JSON.stringify(result.data.result))
        return false
    }

};

const logOff = () => {
    localStorage.removeItem(server.TOKEN_KEY);
    localStorage.removeItem(server.USERNAME);
    localStorage.removeItem(server.FULLNAME);
    localStorage.removeItem(server.PolicyCode);
    localStorage.removeItem(server.PolicyName);
    localStorage.removeItem(server.EmpPict);
    localStorage.removeItem(server.FACTORY);
    localStorage.removeItem(server.APPOVE);
    router.push("/login").catch((err) => {})
}

export default {
    isLoggedIn,
    login,
    logOff,
}