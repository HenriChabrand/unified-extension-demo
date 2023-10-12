import { NowRequest, NowResponse } from '@vercel/node';
import axios from 'axios';

export default async (req: NowRequest, res: NowResponse): Promise<void> => {

    console.log(req.body)
    
    try {
        const request_id = req.body.id;
        const api_key = process.env.API_KEY;
        console.log(request_id)
        console.log(api_key)
        
        // Send the POST request
        const apiResponse = await axios.post(
            'https://83avl41zwi.execute-api.eu-west-3.amazonaws.com/default/unifiedExtensionCardBuilder',
            { 
                request_id: request_id,
                cards:[{
                  title: 'Expension',
                  contents: [
                    {
                      type: 'status',
                      label: 'Status',
                      value: 'Signed',
                      color: 'SUCCESS'
                    },
                    { type: 'text', label: 'Sent', value: '2 days ago' }
                  ]
                },
                {
                  title: 'Acme NDA',
                  contents: [
                    {
                      type: 'status',
                      label: 'Status',
                      value: 'Under Internal Review',
                      color: 'WARNING'
                    },
                    { type: 'text', label: 'Sent', value: '2 days ago' },
                    { type: 'text', label: 'Due Date', value: '12/09/23' },
                    {
                      type: 'status',
                      label: 'Validity',
                      value: 'Outdated',
                      color: 'DANGER'
                    }
                  ]
                }] 
            },
            {
                headers: {
                    'x-api-key': api_key
                }
            }
        );
        console.log(apiResponse.data)
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
