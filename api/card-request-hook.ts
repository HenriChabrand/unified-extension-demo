import { NowRequest, NowResponse } from '@vercel/node';
import { Morph } from 'run-morph-client'; 

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
    console.log(req.body)
    try {
        const request_id = req.body.id;
        let morph = new Morph(process.env.API_KEY, process.env.API_SECRET);
        
        let cardBuilder = morph.newCardBuilder(request_id, true);

        
        let card_2 = cardBuilder.newCard('Morph License Agreement');
        card_2.setLink("https://henri/pm")
        
        card_2.newStatus('Status', 'Awaiting Signature', 'WARNING');
        card_2.newText('Until',  '15/04/24');
        card_2.newText('Signee',  'Mark Ross');
        card_2.newText('Contract PDF',  'voir le PDF','https://comerso.qwoty.io/morph/page/card_proxy?username=com228940166&opportunity_id=894&crm=crm-pipedrive');
        card_2.newText('Owner',  'Henri Chabrand');
        
        card_2.newAction('OPEN_URL_IN_IFRAME', 'Edit Contract', 'https://api.hyperline.co/v1/integrations/crm/cards?action=sync_account&client_id=cli_EZSe3hXAt5hsSg&user_id=usr_A6Scr2OUUdetLC&service=hubspot&account_id=8855404024&redirect_view=customer');
        card_2.newAction('OPEN_URL', 'Download as PDF', 'https://comerso.qwoty.io/morph/page/card_proxy?username=com228940166&opportunity_id=894&crm=crm-pipedrive');
        
        let card = cardBuilder.newCard('NDA Partners (V2.4)');
        card.setLink("https://henri/pm")
        
        card.newStatus('Status', 'Signed', 'SUCCESS');
        card.newText('Since',  '21/03/24');
        card.newText('Signee',  'Ron Swanson');
        card.newText('Owner',  'Henri Chabrand');
        
        card.newAction('OPEN_URL_IN_IFRAME', 'Edit Contract', 'https://en3uubk0woi8f.x.pipedream.net');
        card.newAction('OPEN_URL', 'Download as PDF', 'https://runmorph.dev');

        // Action at the root of the card view
        cardBuilder.newRootAction('OPEN_URL_IN_IFRAME', 'New Contract', 'https://app.runmorph.dev/embedded-flow');



        /*cardBuilder.newRootAction('OPEN_URL_IN_IFRAME', 'Open in Tab', 'https://runmorph.dev');
        cardBuilder.newRootAction('REQUEST', 'Success Action', null, 'action_success');
        cardBuilder.newRootAction('REQUEST', 'Failing Action', null, 'action_failing');*/
        
        
        
        const card_response = await cardBuilder.build();      
        return res.status(201).send(card_response);
        
        /*let success = await cardBuilder.build();
 
        if(success) {
            return res.status(201).send({ message: 'Created' });
        }
        else {
            return res.status(500).json({ 
                message: "An error occurred when sending POST request to the API.", 
                error: "API Request Failed"
            });
        }*/
    } catch (error) {
        console.log(JSON.stringify(error))
        return res.status(500).json({ 
            message: 'An error occurred when fetching the request id or sending post request.', 
            error: error.message
        });
    }
};
