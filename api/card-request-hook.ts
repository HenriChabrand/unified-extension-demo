import { NowRequest, NowResponse } from '@vercel/node';
import { Morph } from 'run-morph-client'; 

export default async (req: NowRequest, res: NowResponse): Promise<void> => {

    console.log(req.body)
    
    try {
       
        const request_id = req.body.id;

        // Init Morph client with your API key
        let morph = new Morph(process.env.API_KEY);

        // Load Morph's Card Builder to build a card response to the current request
        let cardBuilder = morph.newCardBuilder(request_id);
        
        // Create a new card
        let card = cardBuilder.newCard('Partner NDA');
        
        // Add a text content
        card.newText('Owner', 'Henri CHABRAND');
        
        // Add a status content
        let statusContent = card.newStatus('Status', 'Pending', 'WARNING');
        
        // Edit the status
        statusContent.setValue('Signed');
        statusContent.setColor('SUCCESS');

        // Set a card level action
        card.addAction('open_url_in_iframe', 'Open Website', 'https://henri.pm/');

        // Set a header level action
        cardBuilder.addHeaderAction('open_url_in_iframe', 'Open Website from Header', 'https://henri.pm/');

        
        // Build the cards
        let success = await cardBuilder.build(); // Use 'await' to wait for the promise ⚠️
    
        if(success) {
            res.status(201).send({ message: 'Created' });
        } else {           
            res.status(apiResponse.status).json({ 
                message: "An error occurred when sending POST request to the API.", 
                error: apiResponse.statusText 
            });
        }
    } catch (error) {
        console.log(JSON.stringify(error))
        res.status(500).json({ 
            message: 'An error occurred when fetching the request id or sending post request.', 
            error: error.message
        });
    }
};
