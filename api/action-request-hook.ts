import { NowRequest, NowResponse } from '@vercel/node';
import { Morph } from 'run-morph-client'; 

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
    console.log(req.body)
    try {
        const request_id = req.body.id;
        let morph = new Morph(process.env.API_KEY, process.env.API_SECRET);

        if(req.body.type === 'action'){
            let actionResponseBuilder = morph.newActionResponseBuilder(request_id);
            
            // Perform your action

            // Define if the action requested succeed 
            let action_succeed = (req.body.context.action_id !== 'action_failing')
            let action_message = `Action ${req.body.context.action_id} runned !`

            // Build the action response
            let success = await actionResponseBuilder.build(action_succeed, action_message)
            if(success) {
                return res.status(201).send({ message: 'Created' });
            }
        }
    } catch (error) {
        console.log(JSON.stringify(error))
        return res.status(500).json({ 
            message: 'An error occurred when fetching the request id or sending post request.', 
            error: error.message
        });
    }
};
