import { NowRequest, NowResponse } from '@vercel/node';
import { Card } from '../src/Card';


export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  
  const unified_card_model = req.body;
  /* 
    {
      "event_type": "card.view",
      "service_id": "hubspot",
      "workspace_id": "ye7ka0maj7",      
      "entity_type": "contact",
      "entity_id": "123456ASDF",
      "entity_meta": {
        "email": "joahn.d@acme.com"
      }
    }
  */
  // Need to find the relevant vault > connection > consumer based on `workspace_id`
  
  const service_id = unified_card_model.service_id; 
  console.log(service_id)
  
  // Instantiate a new card with a platform
  let card = new Card(service_id);
  
  // Set the card's title
  card.setTitle("Acme NDA");
  
  // Add content to the card using `addText` and `addStatus`
  card.addStatus("Status", "Under Internal Review", "WARNING");
  card.addText("Sent", "2 days ago");
  card.addText("Due Date", "12/09/23");
  card.addStatus("Validity", "Outdated", "DANGER");
  
  
  // This is an asynchronous function, you can use then() to log the result
  try {
    const payload = await card.getPayload(); // await the asynchronous getPayload function 
    res.status(200).json(payload); 
  } catch (error) {
    res.status(500).json({message: 'An error occurred when fetching payload.', error: error.message});
  }
  
};
