import { duffel } from "../duffel/duffel.js";

export const getOfferRequest = async (req, res) => {
    console.log('body', req.body)
    try {
        const response = await duffel.offers.list({
            offer_request_id: req.body.offerRequestId,
            sort: req.body.sort,
        })

        res.status(200).json({ data: response.data, message: 'success' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}