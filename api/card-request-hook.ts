import { NowRequest, NowResponse } from '@vercel/node';
import { Morph } from 'run-morph-client'; 

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
    console.log(req.body)
    try {
        const request_id = req.body.id;
        let morph = new Morph(process.env.API_KEY, process.env.API_SECRET);
        
        let cardBuilder = morph.newCardBuilder(request_id, true);
        
        let card = cardBuilder.newCard('Devis #5456');
        card.setLink("https://henri/pm")
        
        card.newStatus('Status', 'Envoyé', 'WARNING');
        card.newText('Expiration',  '21/03/24');
        card.newText('Lien',  'link.qwoty.io/d/SDR45T45');
        card.newText('Total HT (unique)',  '2400,00€');
        card.newText('Total HT (récurrent)',  '120,00€');
        card.newText('Remise HT (unique)',  '50,00€');
        card.newText('#1', '■ 1 x 1000€ | Poteau De Clôture En Acier Ga...');
        card.newText('#2', '■ 4 x 100€ | Cable De Tension En Acier Inox...');
        card.newText('#3', '■ 8 x 10€ | Piquets Ancrage de Sol en Acier...');
        

        card.newText('#4', '■ 1 x 50€ | Ensemble D\'attaches Pour Clôtu...');
        card.newText('#5', '□ 3 x 200€ | Grille De Clôture En Métal De ...');
        card.newText('#6', '▣ 50 x 5€ | Gravier Pour Répartition De Cha...');
        card.newText('#7', '□ 1 x 400€ | Porte De Jardin À Double Batta...');
        card.newText('#8', '▣ 6 x 150€ | Panneau Modulable De Clôture E...');
        card.newAction('OPEN_URL_IN_IFRAME', 'Open iFrame', 'https://app.runmorph.dev/embedded-flow');
        card.newAction('OPEN_URL_IN_IFRAME', 'Open in Tab', 'https://runmorph.dev');

        // Action at the root of the card view
        cardBuilder.newRootAction('OPEN_URL_IN_IFRAME', 'Open iFrame', 'https://app.runmorph.dev/embedded-flow');
        cardBuilder.newRootAction('OPEN_URL_IN_IFRAME', 'Open in Tab', 'https://runmorph.dev');
        cardBuilder.newRootAction('REQUEST', 'Success Action', null, 'action_success');
        cardBuilder.newRootAction('REQUEST', 'Failing Action', null, 'action_failing');
        
        
        
        const card_response = await cardBuilder.build();      
        return res.status(201).send({
    "card_view": {
        "root": {
            "actions": [
                {
                    "type": "OPEN_URL_IN_IFRAME",
                    "label": "Nouveau devis",
                    "url": "https://activetest.qwile.com/morph/page/card_proxy?username=act121759068663502&opportunity_id=17590686635"
                }
            ]
        },
        "cards": [
            {
                "title": "Devis #351",
                "contents": [
                    {
                        "type": "status",
                        "label": "Statut",
                        "value": "En cours",
                        "color": "INFO"
                    },
                    {
                        "type": "text",
                        "label": "Expiration",
                        "value": "01-01-1970",
                        "color": null
                    },
                    {
                        "type": "text",
                        "label": "Lien du devis",
                        "value": "https://activetest.qwile.com?id=act121759068663501",
                        "color": null
                    },
                    {
                        "type": "text",
                        "label": "Total HT (unique)",
                        "value": " €",
                        "color": null
                    },
                    {
                        "type": "text",
                        "label": "Total HT (récurrent)",
                        "value": " €",
                        "color": null
                    },
                    {
                        "type": "text",
                        "label": "Remise HT (unique)",
                        "value": " €",
                        "color": null
                    },
                    {
                        "type": "text",
                        "label": "#1",
                        "value": "■   1 X  | Gobelets 15cl",
                        "color": null
                    },
                    {
                        "type": "text",
                        "label": "#2",
                        "value": "■   6 X  | Gobelets 25 cl",
                        "color": null
                    },
                    {
                        "type": "text",
                        "label": "#3",
                        "value": "■   1 X  | Pérou BIO",
                        "color": null
                    }
                ],
                "actions": [
                    {
                        "type": "OPEN_URL_IN_IFRAME",
                        "label": "Modifier",
                        "url": "https://activetest.qwile.com/asjzo1818nszijhhsbz81u2nznh?frm_action=edit&entry=351"
                    }
                ],
                "link": "https://activetest.qwile.com/asjzo1818nszijhhsbz81u2nznh?frm_action=edit&entry=351"
            }
        ]
    }
});
        
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
