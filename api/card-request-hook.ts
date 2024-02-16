import { NowRequest, NowResponse } from '@vercel/node';
import { Morph } from 'run-morph-client'; 

export default async (req: NowRequest, res: NowResponse): Promise<void> => {

    console.log(req.body)
    /*
    {
      id: 're-833a-c30f-8765-7f440e1066', 
      created_at: '2023-10-17T09:22:16.040Z',
      status: 'card.requested',
      context: {
        service_id: 'hubspot',
        workspace_id: '9950766',
        entity_type: 'contact',
        entity_id: '123'
      }
    } 
    */
    
    try {
       
        const request_id = req.body.id;

        // Init Morph client with your API key
        let morph = new Morph(process.env.API_KEY, process.env.API_SECRET);

        // Load Morph's Card Builder to build a card response to the current request
        let cardBuilder = morph.newCardBuilder(request_id);
        
        // Create a new card
        let card = cardBuilder.newCard('Devis #5456');

        card.setLink("https://henri.pm/")

        //
        card.newStatus('Status', 'Envoyé', 'WARNING');
        card.newText('Total (HT)', '1400€');
        
        card.newText('  Poteau', '1 x 1000€');
        card.newText('  Cable', '4 x 100€');
        


        // Set a card level action
        card.newAction('OPEN_URL_IN_IFRAME', 'Edit in Qwoty', 'https://henri.pm/');
        //card.newAction('OPEN_URL_IN_IFRAME', 'Open Website 2', 'https://app.runmorph.dev/embedded-flow?serviceId=hubspot');

        // Set a card panel level action
        cardBuilder.newRootAction('OPEN_URL_IN_IFRAME', 'Nouveau devis', 'https://app.runmorph.dev/embedded-flow?serviceId='+req.body.context.service_id);


        
   
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
