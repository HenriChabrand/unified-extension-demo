import { NowRequest, NowResponse } from '@vercel/node';
import { Morph } from 'run-morph-client'; 

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
    console.log(req.body)
    try {
        const request_id = req.body.id;
        let morph = new Morph(process.env.API_KEY, process.env.API_SECRET);
        
        let cardBuilder = morph.newCardBuilder(request_id);
        
        let card = cardBuilder.newCard('Devis #5456');
        card.setLink("mailto:no-one@snai1mai1.com?subject=look at this website&body=Hi,I found this website and thought you might like it http://www.geocities.com/wowhtml/")
        
        card.newStatus('Status', 'Envoyé', 'WARNING');
        card.newText('Expiration',  '21/03/24');
        card.newText('Lien',  'link.qwoty.io/d/SDR45T45');
        card.newText('Total HT ➀',  '2400,00€');
        card.newText('Total HT ↻',  '120,00€');
        card.newText('Remise HT ➀',  '50,00€');
        card.newText('#1', 'Poteau De Clôture En Acier Galvanisé (1 x 1000€)');
        card.newText('#2', 'Cable De Tension En Acier Inoxydable (4 x 100€)');
        card.newText('#3', 'Piquets Ancrage de Sol en Acier Galvanisé (8 x 10€)');

        card.newText('#4', 'Ensemble D\'attaches Pour Clôture (1 x 50€)');
        card.newText('#5', 'Grille De Clôture En Métal De Qualité Supérieure (3 x 200€)');
        card.newText('#6', 'Gravier Pour Répartition De Charge (50 x 5€)');
        card.newText('#7', ' □ Porte De Jardin À Double Battant (1 x 400€)');
        card.newText('#8', ' ■ Panneau Modulable De Clôture En Bois (6 x 150€)');
        card.newAction('OPEN_URL_IN_IFRAME', 'Open iFrame', 'https://app.runmorph.dev/embedded-flow');
        card.newAction('OPEN_URL_IN_IFRAME', 'Open in Tab', 'https://runmorph.dev');

        // Action at the root of the card view
        cardBuilder.newRootAction('OPEN_URL_IN_IFRAME', 'Open iFrame', 'https://app.runmorph.dev/embedded-flow');
        cardBuilder.newRootAction('OPEN_URL_IN_IFRAME', 'Open in Tab', 'https://runmorph.dev');
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
