import { NowRequest, NowResponse } from '@vercel/node';
import { CardBuilder } from '../src/cardBuilder'; 

export default async (req: NowRequest, res: NowResponse): Promise<void> => {

    console.log(req.body)
    
    try {
        const request_id = req.body.id;
        
        let builder = new CardBuilder(request_id, process.env.API_KEY);
        
        let card = builder.newCard('Expension');
        
        let textContent = card.newText('Sent', '2 days ago');
        textContent.setLabel('New Label');
        textContent.setValue('New Value');
        
        let statusContent = card.newStatus('Status', 'Incomplete', 'WARNING');
        statusContent.setLabel('New Status Label');
        statusContent.setValue('New Status Value');
        statusContent.setColor('SUCCESS');
        
        let success = await builder.build(); // Use 'await' to wait for the promise ⚠️
    
        if(success) {
            res.status(201).send({ message: 'Created' });
        } else {           
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
