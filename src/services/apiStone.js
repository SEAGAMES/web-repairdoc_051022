import httpClient from './httpClient'
import { serverStone } from './constants'





const getStonePurchase = async() => {
    const result = await httpClient.get(serverStone.GETSTONEPURCHASE)
    return result.data
}


export default {
    getStonePurchase
}