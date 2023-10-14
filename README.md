# Unified Extension (Demo)

A Vercel serverless function for unifying creation of CRM extension cards for HubSpot, Salesforce, and Intercom.

## Overview

This project provides the architecture necessary for creating, handling and delivering CRM extension card requests across multiple platforms.

The primary classes of this project is `CardBuilder`, allowing you to manages the card creation process. 
It requires a `requestId` (extracted from the incoming request's body), and an `apiKey` (stored as an environment variable) upon initialization.

When you've built your desired cards and content, the `CardBuilder.build()` method can be used to automatically convert and deliver the card in the appropriate format for the targeted platform.


## Getting Started

Follow these steps to get the project up and running:

1. **Deploy on Vercel**:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHenriChabrand%2Funified-extension-demo&env=API_KEY&envDescription=Get%20in%20touche%20with%20henri.chabrand%40gmail.com%20to%20get%20your%20API%20Key.&envLink=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fhenri-chabrand--product-manager%2F&project-name=unified-extension-demo-company&repository-name=unified-extension-demo-company)
   
2. **Test with Postman**:

   GET `https://tlgbrx45cg.execute-api.eu-west-3.amazonaws.com/api/request-hook`
   
    _Query Parameters_


   **`hook_redirection`**: The URL of your Vercel deployement e.g. `https://project-name.vercel.app/api/card-request-hook`

   **`service_id`**: The ID of the simulated platform, which can be either `hubspot`, `salesforce`, or `intercom`.

    You should receive a response that includes the generated cards in the appropriate payload format expected by the targeted platform.
3. **Edit `api/main.ts` and play with the CardBuilder**:
```typescript
let builder = new CardBuilder(request_id, process.env.API_KEY);

let card = builder.newCard('Partner NDA');

let textContent = card.newText('Owner', 'Henri CHABRAND');

let statusContent = card.newStatus('Status', 'Pending', 'WARNING');
statusContent.setValue('Signed');
statusContent.setColor('SUCCESS');

let success = await builder.build(); // Wait for the build to complete to prevent the process from terminating prematurely
```


## Integrate


Details coming soon. 

Stay tuned!
