# Unified Extension (demo)

A Vercel serverless function for building CRM extension cards in HubSpot, Salesforce and Intercom.


## Concept

The project provides the infrastructure for creating and handling cards request from different platform. 

The `CardBuilder`, `Card`, and `CardContent` classes are the core of this project. 

The `CardBuilder` class is responsible for building and sending cards. It takes a `requestId` and an `apiKey` as arguments upon instantiation. The `requestId` is obtained from an incoming request's body, while the `apiKey` is stored as an environment variable.

The `Card` class is responsible for creating a card. Each card contains a `title` and an array of `contents`. 

The `CardContent` class is responsible for creating content for a card. Content could be of type `text` or `status`.

Once you have built the desired cards and content, utilize the `CardBuilder.build()` method to automatically generate the card in the appropriate format for the targeted platform.

## Quick Start

1. Clone this repository:

   ```
   git clone https://github.com/username/project-repo.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Add environment variable for your API key in a `.env` file:

   ```
   API_KEY=your-unique-api-key
   ```

4. Run the development server:

   ```
   vercel dev
   ```

## Using CardBuilder

Here's an example of how to use `CardBuilder` in your code:

```typescript
let builder = new CardBuilder(request_id, process.env.API_KEY);

let card = builder.newCard('Partner NDA');

let textContent = card.newText('Owner', 'Henri CHABRAND');

let statusContent = card.newStatus('Status', 'Pending', 'WARNING');

statusContent.setValue('Signed');
statusContent.setColor('SUCCESS');

let success = await builder.build(); // Wait until the build is complete to avoid killing the process ⚠️
```

## Test On Postman



GET to endpoint `https://tlgbrx45cg.execute-api.eu-west-3.amazonaws.com/api/request-hook` with the following query parameter

`hook_redirection` : the url of your `card-request-hook` deployement (e.g https://project-name.vercel.app/api/card-request-hook)
`service_id` : the id of the simulated platform, which can be either `hubspot`, `salesforce` or `intercom` 

You will get as a response the cards generated in the right payload format for the taregted platform.



## Test On HubSpot

TO come
