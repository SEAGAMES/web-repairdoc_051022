import httpClient from './httpClient'
import { serverReport } from './constants'




const reportChartBill = async() => {
    const result = await httpClient.get(`${serverReport.getRepairMonthChart}`)
        // console.log(result.data)
    return result.data.result
}



export default {
    reportChartBill
}