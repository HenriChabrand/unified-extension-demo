import { NowRequest, NowResponse } from '@vercel/node';
import { Morph } from 'run-morph-client';

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
    console.log(req.body);
    try {
        const request_id = req.body.id;
        if (!request_id) {
            throw new Error("Request ID is missing");
        }

        const apiKey = process.env.API_KEY;
        const apiSecret = process.env.API_SECRET;

        if (!apiKey || !apiSecret) {
            throw new Error("API credentials are missing");
        }

        let morph = new Morph(apiKey, apiSecret);

        if (req.body.type === 'action' && req.body.context?.action_id) {
            let actionResponseBuilder = morph.newActionResponseBuilder(request_id);

            // Define if the action requested succeeded
            let action_succeed = req.body.context.action_id !== 'action_failing';
            let action_message = `Action ${req.body.context.action_id} executed!`;

            // Build the action response
            let success = await actionResponseBuilder.build(action_succeed, action_message);
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
