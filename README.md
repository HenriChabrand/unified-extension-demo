# Unified Extension (Demo)

A Vercel serverless function for unifying creation of CRM extension cards for HubSpot, Salesforce, and Intercom.

## Overview

This project provides the architecture necessary for creating, handling and delivering CRM extension card requests across multiple platforms.

The primary classes of this project, `CardBuilder`, `Card`, and `CardContent`, form the core functioning units.

-  `CardBuilder`: Manages the card creation process. It requires a `requestId` (extracted from the incoming request's body), and an `apiKey` (stored as an environment variable) upon initialization.

-  `Card`: Represents a card object. Each card has a `title` and an array of `contents`.

-  `CardContent`: Designed for creating the content of a card. The content can be of type `text` or `status`.

When you've built your desired cards and content, the `CardBuilder.build()` method can be used to automatically convert and deliver the card in the appropriate format for the targeted platform.

## Getting Started

Follow these steps to get the project up and running:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/username/project-repo.git
    ```
   
2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set environment variable** in `.env` file:

    ```env
    API_KEY=your-unique-api-key
    ```

4. **Start the development server**:

    ```bash
    vercel dev
    ```

## Using CardBuilder

Here's an example of how `CardBuilder` can be used:

```typescript
let builder = new CardBuilder(request_id, process.env.API_KEY);

let card = builder.newCard('Partner NDA');

let textContent = card.newText('Owner', 'Henri CHABRAND');

let statusContent = card.newStatus('Status', 'Pending', 'WARNING');
statusContent.setValue('Signed');
statusContent.setColor('SUCCESS');

let success = await builder.build(); // Wait for the build to complete to prevent the process from terminating prematurely
```

## Testing with Postman

Send a GET request to the endpoint `https://tlgbrx45cg.execute-api.eu-west-3.amazonaws.com/api/request-hook` with the following query parameters:

-  `hook_redirection`: The URL where your `card-request-hook` deployment exists. Example: `https://project-name.vercel.app/api/card-request-hook)`
-  `service_id`: The ID of the simulated platform, which can be either `hubspot`, `salesforce`, or `intercom`.

You will receive a response that includes the generated cards in the appropriate payload format for the targeted platform.

## Testing with HubSpot

Details coming soon. 

Stay tuned!
