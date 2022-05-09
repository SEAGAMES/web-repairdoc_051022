import axios from "axios"


const apiURL = `http://192.168.3.7:60009/apiwater/`;
const apiCheckStatus = "http://192.168.3.7:60009/api/v4/clients/";

const getWaterReportMONTH = async () => {
    const d = new Date();
    const vYear = d.getFullYear();
    const vMonth = d.getMonth()+1;
    const vDay = d.getDate()
    try {
        const result = await axios.get(`${apiURL}getMonthDay/${vYear}/${vMonth}`)
        if (result.statusText === "OK") {
            return result.data
        }
    } catch (error) {
        console.log('Error Backend', error)
    }
}

const getWaterLogOfDay = async () => {
        try {
            const result = await axios.get(`${apiURL}getwaterlogofday`)
            let result2 = result.data;
            result2.forEach((data, index) => {
                result2[index].formUpdate = {
                  position: data.position,
                  exrate: data.exrate,
                  rateLimit: data.rateLimit,
                };
            });
            return result2
        } catch (error) {
            console.log('Error Backend',error)
        }
}

const updatewaterLimit = async(deviceCode, data) => {
    try {
        const result = await axios.post(`${apiURL}updatewaterLimit/${deviceCode}`, data)
        return result.data
    } catch (error) {
        console.log('Error Backend',error)
    }
}

const getColorWeekend = async () => {
    try {
        const result = await axios.get(`${apiURL}getcolorweekend`)
        let values = []
        result.data.forEach((data, index) => {
            values.push(data.CssColor);
        });
        return values;
    } catch (error) {
        console.log(error)
    }
}


// test CheckStatus 
const checkStatusDevice = async () => {
    // const serial = 'esp32-bc8686d108f0';
    try {
        const result = await axios.get(`http://192.168.3.7:60009/api/v4/clients/esp32-bc8686d108f0`, {auth: {
            username: 'admin',
            password: 'public'
        }});
        console.log('ค่า', result);
    } catch (error) {
        console.log('Error หรอ',error)
    }
}

const changeDateFilter = async (dateParse) => {
    try {
        const result = await axios.post(`${apiURL}dateFilter`, dateParse)
        return result.data
    } catch (error) {
        console.log('Error หรือ',error)
    }
}


export default {
    getWaterReportMONTH,
    getWaterLogOfDay,
    updatewaterLimit,
    checkStatusDevice,
    getColorWeekend,
    changeDateFilter
}
