import { NowRequest, NowResponse } from '@vercel/node';
import { Morph } from 'run-morph-client'; 

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
    console.log(req.body)
    try {
        const request_id = req.body.id;
        let morph = new Morph(process.env.API_KEY, process.env.API_SECRET);

        if(req.body.type === 'action'){
            let actionResponseBuilder = morph.newActionResponseBuilder(request_id);
            let success = await actionResponseBuilder.build( (req.body.context.action_id !== 'action_failing'),`Action 
            ${req.body.context.action_id} runned !`)
            if(success) {
                return res.status(201).send({ message: 'Created' });
            }
        }

        let cardBuilder = morph.newCardBuilder(request_id);
        let card = cardBuilder.newCard('Devis #5456');
        card.setLink("https://henri.pm/")
        card.newStatus('Status', 'Envoyé', 'WARNING');
        card.newText('Time',  new Date().toLocaleTimeString() );
        card.newText('#1', ' ■ Poteau (1 x 1000€)');
        card.newText('#2', ' ■ Cable (4 x 100€)');
        card.newText('#3', ' □ Sardine (8 x 10€)');
        card.newAction('OPEN_URL_IN_IFRAME', 'Card Action', 'https://app.runmorph.dev/embedded-flow');
        cardBuilder.newRootAction('REQUEST', 'Success Action', null, 'action_success');
        cardBuilder.newRootAction('REQUEST', 'Failing Action', null, 'action_failing');
        let success = await cardBuilder.build();
 
        if(success) {
            return res.status(201).send({ message: 'Created' });
        }
        else {
            return res.status(500).json({ 
                message: "An error occurred when sending POST request to the API.", 
                error: "API Request Failed"
            });
        }
    } catch (error) {
        console.log(JSON.stringify(error))
        return res.status(500).json({ 
            message: 'An error occurred when fetching the request id or sending post request.', 
            error: error.message
        });
    }
};
