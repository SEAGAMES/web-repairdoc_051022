import { serveremployee, serverDevice } from '../services/constants'
import httpClient from './httpClient'


const getemployee = async() => {
    const result = await httpClient.get(`${serverDevice.GETEMPLOYEE}`);
    // console.log(result.data);
    return result.data
}

//http://172.16.0.2:8081/api/v2/getmouldbill/

export default {
    getemployee,
}