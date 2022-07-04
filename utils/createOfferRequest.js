import { duffel } from "../duffel/duffel.js";

export const createOfferRequest = async ({ body }, res) => {
    // console.log('body', body.input)
    try{
        const offerRequestResponse = await duffel.offerRequests.create(body.input)
        console.log('Offer request Success')
        res.status(200).json({data: offerRequestResponse.data})
    } catch(err) {
        console.log('error', err)
        res.status(500).json({error: err})
    }    
}