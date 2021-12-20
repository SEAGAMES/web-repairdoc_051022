// import router from '../router';
import axios from "axios";
import { apiConvertImg, serverDevice } from '../services/constants'
import httpClient from './httpClient'

const getCategory = async() => {
    let result = await httpClient.get(serverDevice.GETCATEGORY);
    // console.log(result.data);
    return result.data
}

const getFloor = async() => {
    let result = await httpClient.get(serverDevice.GETFLOOR);
    // console.log(result.data);
    return result.data
}

const getRoom = async() => {
    let result = await httpClient.get(serverDevice.GETROOM);
    // console.log(result.data);
    return result.data
}

const createDevice = async(created) => {
    // console.log('Back',created);
    let result = await httpClient.post(serverDevice.CREATEDEVICE, created);
    // console.log(result.data.result)
    return result.data.result
}

const getDeviceMaster = async() => {
    const result = await httpClient.get(serverDevice.GETDEVICEMASTER);
    // console.log(result.data);
    return result.data
}

const deleteDevice = async(id) => {
    const result = await httpClient.delete(`${serverDevice.GETDEVICEMASTER}/${id}`)
    return result.data
}

const geteditDevice = async(id) => {
    const result = await httpClient.get(`${serverDevice.GETEDITDEVICE}/${id}`)
    return result.data
}

const editDevice = async(id, editdata) => {
    const result = await httpClient.post(`${serverDevice.EDITDEVICE}/${id}`, editdata);
    return result.data.result
}

const getemployee = async() => {
    const result = await httpClient.get(`${serverDevice.GETEMPLOYEE}`);
    // console.log(result.data);
    return result.data
}

const getRepairDetail = async(id) => {
    const result = await httpClient.get(`${serverDevice.GETREPAIRDETAIL}/${id}`);
    // console.log(result.data);
    return result.data
}

const updateStatusDevice = async(data) => {
    const result = await httpClient.post(`${serverDevice.UPDATESTATUSDEVICE}`, data);
    // console.log(result.data);
    return result.data.result
}



export default {
    getCategory,
    getFloor,
    getRoom,
    createDevice,
    getDeviceMaster,
    deleteDevice,
    geteditDevice,
    editDevice,
    getemployee,
    getRepairDetail,
    updateStatusDevice,
}