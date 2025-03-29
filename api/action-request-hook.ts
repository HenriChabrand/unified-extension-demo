import { NowRequest, NowResponse } from '@vercel/node';
import { Morph } from 'run-morph-client';

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
    console.log(req.body);

    try {
        const request_id = req.body.id ?? "";
        if (!request_id) throw new Error("Request ID is missing");

        const apiKey = process.env.API_KEY ?? "";
        const apiSecret = process.env.API_SECRET ?? "";

        if (!apiKey || !apiSecret) throw new Error("API credentials are missing");

        let morph = new Morph(apiKey, apiSecret);

        if (req.body.type === 'card' && req.body.context?.card_id) {
            let cardId = req.body.context.card_id ?? "";
            let cardResponseBuilder = morph.newCardResponseBuilder(request_id);

            let card_succeed = cardId !== 'card_failing';
            let card_message = `Card ${cardId} processed!`;

            let success = await cardResponseBuilder.build(card_succeed, card_message);
            if (success) {
                res.status(201).json({ message: 'Created' });
                return;
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred when processing the request.',
            error: (error as Error).message
        });
    }
};
