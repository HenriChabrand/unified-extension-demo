import { NowRequest, NowResponse } from '@vercel/node';
import axios from 'axios';

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
    try {
        const requestId = req.body.request_id;
        
        // Send the POST request
        const apiResponse = await axios.post(
            'https://83avl41zwi.execute-api.eu-west-3.amazonaws.com/default/unifiedExtensionCardBuilder',
            { 
                request_id: requestId 
            }
        );

        // If the POST request is successful
        if(apiResponse.status === 200) {
            res.status(201).send({ message: 'Created' });
        } else {
            // If the API didn't return a 200 status code, pass that error back to the client.
            res.status(apiResponse.status).json({ 
                message: "An error occurred when sending POST request to the API.", 
                error: apiResponse.statusText 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'An error occurred when fetching the request id or sending post request.', 
            error: error.message
        });
    }
};