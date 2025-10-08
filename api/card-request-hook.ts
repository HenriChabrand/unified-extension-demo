import { NowRequest, NowResponse } from "@vercel/node";
import { Morph } from "run-morph-client";

export default async (
  req: NowRequest,
  res: NowResponse
): Promise<NowResponse> => {
  console.log(req.body);
  try {
    const request_id = req.body.id;
    if (!process.env.API_KEY || !process.env.API_SECRET) {
      throw new Error("API credentials not configured");
    }

    const morph = new Morph(process.env.API_KEY, process.env.API_SECRET);
    const cardBuilder = morph.newCardBuilder(request_id, true);

    const card_2 = cardBuilder.newCard("Morph License Agreement");
    card_2.setLink("https://henri.pm");

    card_2.newStatus("Status", "Awaiting Signature", "WARNING");
    card_2.newText("Until", "15/04/24");
    card_2.newText("Signee", "Mark Ross");
    card_2.newText(
      "Contract PDF",
      "voir le PDF",
      "https://app.runmorph.dev/embedded-flow"
    );
    card_2.newText("Owner", "Henri Chabrand");

    card_2.newAction(
      "OPEN_URL_IN_IFRAME",
      "Edit Contract",
      "https://app.runmorph.dev/embedded-flow"
    );
    card_2.newAction(
      "OPEN_URL",
      "Download as PDF",
      "https://app.runmorph.dev/embedded-flow"
    );

    const nda_card = cardBuilder.newCard("NDA Partners (V2.4)");
    nda_card.setLink("https://henri/pm");

    nda_card.newStatus("Status", "Signed", "SUCCESS");
    nda_card.newText("Since", "21/03/24");
    nda_card.newText("Signee", "Ron Swanson");
    nda_card.newText("Owner", "Henri Chabrand", "https://henri.pm");
    nda_card.newAction("REQUEST", "Success Action", "", "action_success");
    nda_card.newAction("REQUEST", "Failing Action", "", "action_failing");
     cardBuilder.newRootAction(
      "OPEN_URL_IN_IFRAME",
      "Open URL (iframe)",
      "https://app.runmorph.dev/embedded-flow"
    );

    cardBuilder.newRootAction(
      "OPEN_URL",
      "Open URL (tab)",
      "https://app.runmorph.dev/embedded-flow"
    );
    cardBuilder.newRootAction(
      "REQUEST",
      "Success Action",
      "",
      "action_success"
    );
    cardBuilder.newRootAction(
      "REQUEST",
      "Failing Action",
      "",
      "action_failing"
    );

    const debug_card = cardBuilder.newCard("Test");
    debug_card.newText("Debug", "true");
    debug_card.newAction(
      "OPEN_URL_IN_IFRAME",
      "Edit Contract",
      "https://app.runmorph.dev/embedded-flow"
    );

    const card_response = await cardBuilder.build();


    return res.status(201).send(
{
    "type": "card_view",
    "completed": true,
    "card_view": {
        "root": {
            "actions": [
                {
                    "type": "OPEN_URL_IN_IFRAME",
                    "label": "Manage customer",
                    "url": "https://app.hyperline.co/app/customers/cus_vxsb6nzZ47TcYw?sidebar=false&embedded=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwIiwidXNlcklkIjoidXNyX1l0Y2pEZkRiUFdNOTVCIiwiY2xpZW50SWQiOiJjbGlfV2QwMFBaRV94WXJtYzAiLCJjcm0iOnsiY29tcGFueUlkIjoiMTEwNDM4NTY5NyIsImNvbnRhY3RJZCI6bnVsbCwib3Bwb3J0dW5pdHlJZCI6bnVsbH0sImlzcyI6Imh5cGVybGluZSIsImlhdCI6MTc1OTQ4NTQwNCwiZXhwIjoxNzU5NDg5MDA0fQ._3A1yN8cL49GXp3iyOPq5x4iS6xzZcID0G8OMIiT-Uw"
                },
                {
                    "type": "OPEN_URL_IN_IFRAME",
                    "label": "Create quote",
                    "url": "https://app.hyperline.co/app/quoting/quotes/create?customerId=cus_vxsb6nzZ47TcYw&sidebar=false&embedded=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwIiwidXNlcklkIjoidXNyX1l0Y2pEZkRiUFdNOTVCIiwiY2xpZW50SWQiOiJjbGlfV2QwMFBaRV94WXJtYzAiLCJjcm0iOnsiY29tcGFueUlkIjoiMTEwNDM4NTY5NyIsImNvbnRhY3RJZCI6bnVsbCwib3Bwb3J0dW5pdHlJZCI6bnVsbH0sImlzcyI6Imh5cGVybGluZSIsImlhdCI6MTc1OTQ4NTQwNCwiZXhwIjoxNzU5NDg5MDA0fQ._3A1yN8cL49GXp3iyOPq5x4iS6xzZcID0G8OMIiT-Uw"
                },
                {
                    "type": "OPEN_URL_IN_IFRAME",
                    "label": "Create quote update",
                    "url": "https://app.hyperline.co/app/quoting/quotes/subscription-update/cus_vxsb6nzZ47TcYw?sidebar=false&embedded=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwIiwidXNlcklkIjoidXNyX1l0Y2pEZkRiUFdNOTVCIiwiY2xpZW50SWQiOiJjbGlfV2QwMFBaRV94WXJtYzAiLCJjcm0iOnsiY29tcGFueUlkIjoiMTEwNDM4NTY5NyIsImNvbnRhY3RJZCI6bnVsbCwib3Bwb3J0dW5pdHlJZCI6bnVsbH0sImlzcyI6Imh5cGVybGluZSIsImlhdCI6MTc1OTQ4NTQwNCwiZXhwIjoxNzU5NDg5MDA0fQ._3A1yN8cL49GXp3iyOPq5x4iS6xzZcID0G8OMIiT-Uw"
                },
                {
                    "type": "OPEN_URL_IN_IFRAME",
                    "label": "Assign subscription",
                    "url": "https://app.hyperline.co/app/subscriptions/create?customerId=cus_vxsb6nzZ47TcYw&sidebar=false&embedded=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwIiwidXNlcklkIjoidXNyX1l0Y2pEZkRiUFdNOTVCIiwiY2xpZW50SWQiOiJjbGlfV2QwMFBaRV94WXJtYzAiLCJjcm0iOnsiY29tcGFueUlkIjoiMTEwNDM4NTY5NyIsImNvbnRhY3RJZCI6bnVsbCwib3Bwb3J0dW5pdHlJZCI6bnVsbH0sImlzcyI6Imh5cGVybGluZSIsImlhdCI6MTc1OTQ4NTQwNCwiZXhwIjoxNzU5NDg5MDA0fQ._3A1yN8cL49GXp3iyOPq5x4iS6xzZcID0G8OMIiT-Uw"
                }
            ]
        },
        "cards": [
            {
                "title": "Subscription (Pinpoint Enterprise Plan)",
                "link": "https://app.hyperline.co/app/subscriptions/sub_I23JHCiYCypHsc?sidebar=false&embedded=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwIiwidXNlcklkIjoidXNyX1l0Y2pEZkRiUFdNOTVCIiwiY2xpZW50SWQiOiJjbGlfV2QwMFBaRV94WXJtYzAiLCJjcm0iOnsiY29tcGFueUlkIjoiMTEwNDM4NTY5NyIsImNvbnRhY3RJZCI6bnVsbCwib3Bwb3J0dW5pdHlJZCI6bnVsbH0sImlzcyI6Imh5cGVybGluZSIsImlhdCI6MTc1OTQ4NTQwNCwiZXhwIjoxNzU5NDg5MDA0fQ._3A1yN8cL49GXp3iyOPq5x4iS6xzZcID0G8OMIiT-Uw",
                "contents": [
                    {
                        "type": "status",
                        "label": "Status",
                        "value": "Active",
                        "color": "SUCCESS"
                    },
                    {
                        "type": "text",
                        "label": "Pinpoint Enterprise Plan",
                        "value": " 10\u202f000,00 £GB / year"
                    },
                    {
                        "type": "text",
                        "label": "Estimated ARR",
                        "value": "0,00 £GB"
                    },
                    {
                        "type": "text",
                        "label": "Phase duration",
                        "value": "1 Apr 2020 - 1 Nov 2025"
                    },
                    {
                        "type": "status",
                        "label": "Last invoice status",
                        "value": "Paid",
                        "color": "SUCCESS"
                    }
                ],
                "actions": [
                    {
                        "type": "OPEN_URL_IN_IFRAME",
                        "label": "Manage subscription",
                        "url": "https://app.hyperline.co/app/subscriptions/sub_I23JHCiYCypHsc?sidebar=false&embedded=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwIiwidXNlcklkIjoidXNyX1l0Y2pEZkRiUFdNOTVCIiwiY2xpZW50SWQiOiJjbGlfV2QwMFBaRV94WXJtYzAiLCJjcm0iOnsiY29tcGFueUlkIjoiMTEwNDM4NTY5NyIsImNvbnRhY3RJZCI6bnVsbCwib3Bwb3J0dW5pdHlJZCI6bnVsbH0sImlzcyI6Imh5cGVybGluZSIsImlhdCI6MTc1OTQ4NTQwNCwiZXhwIjoxNzU5NDg5MDA0fQ._3A1yN8cL49GXp3iyOPq5x4iS6xzZcID0G8OMIiT-Uw"
                    },
                    {
                        "type": "OPEN_URL_IN_IFRAME",
                        "label": "Create quote update",
                        "url": "https://app.hyperline.co/app/quoting/quotes/subscription-update/cus_vxsb6nzZ47TcYw/sub_I23JHCiYCypHsc?sidebar=false&embedded=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwIiwidXNlcklkIjoidXNyX1l0Y2pEZkRiUFdNOTVCIiwiY2xpZW50SWQiOiJjbGlfV2QwMFBaRV94WXJtYzAiLCJjcm0iOnsiY29tcGFueUlkIjoiMTEwNDM4NTY5NyIsImNvbnRhY3RJZCI6bnVsbCwib3Bwb3J0dW5pdHlJZCI6bnVsbH0sImlzcyI6Imh5cGVybGluZSIsImlhdCI6MTc1OTQ4NTQwNCwiZXhwIjoxNzU5NDg5MDA0fQ._3A1yN8cL49GXp3iyOPq5x4iS6xzZcID0G8OMIiT-Uw"
                    },
                    {
                        "type": "OPEN_URL_IN_IFRAME",
                        "label": "View last invoice",
                        "url": "https://app.hyperline.co/app/invoices/inv_lmrAvNtponyF8z?sidebar=false&embedded=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwIiwidXNlcklkIjoidXNyX1l0Y2pEZkRiUFdNOTVCIiwiY2xpZW50SWQiOiJjbGlfV2QwMFBaRV94WXJtYzAiLCJjcm0iOnsiY29tcGFueUlkIjoiMTEwNDM4NTY5NyIsImNvbnRhY3RJZCI6bnVsbCwib3Bwb3J0dW5pdHlJZCI6bnVsbH0sImlzcyI6Imh5cGVybGluZSIsImlhdCI6MTc1OTQ4NTQwNCwiZXhwIjoxNzU5NDg5MDA0fQ._3A1yN8cL49GXp3iyOPq5x4iS6xzZcID0G8OMIiT-Uw"
                    }
                ]
            },
            {
                "title": "Subscription (Pinpoint Enterprise Plan)",
                "link": "https://app.hyperline.co/app/subscriptions/sub_4WqLzIIpC91DW9?sidebar=false&embedded=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwIiwidXNlcklkIjoidXNyX1l0Y2pEZkRiUFdNOTVCIiwiY2xpZW50SWQiOiJjbGlfV2QwMFBaRV94WXJtYzAiLCJjcm0iOnsiY29tcGFueUlkIjoiMTEwNDM4NTY5NyIsImNvbnRhY3RJZCI6bnVsbCwib3Bwb3J0dW5pdHlJZCI6bnVsbH0sImlzcyI6Imh5cGVybGluZSIsImlhdCI6MTc1OTQ4NTQwNCwiZXhwIjoxNzU5NDg5MDA0fQ._3A1yN8cL49GXp3iyOPq5x4iS6xzZcID0G8OMIiT-Uw",
                "contents": [
                    {
                        "type": "status",
                        "label": "Status",
                        "value": "Active",
                        "color": "SUCCESS"
                    },
                    {
                        "type": "text",
                        "label": "Pinpoint Enterprise Plan",
                        "value": " 10\u202f000,00 £GB / year"
                    },
                    {
                        "type": "text",
                        "label": "Estimated ARR",
                        "value": "10\u202f000,00 £GB"
                    },
                    {
                        "type": "text",
                        "label": "Duration",
                        "value": "19 Sept 2019 - Forever"
                    },
                    {
                        "type": "status",
                        "label": "Last invoice status",
                        "value": "Paid",
                        "color": "SUCCESS"
                    }
                ],
                "actions": [
                    {
                        "type": "OPEN_URL_IN_IFRAME",
                        "label": "Manage subscription",
                        "url": "https://app.hyperline.co/app/subscriptions/sub_4WqLzIIpC91DW9?sidebar=false&embedded=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwIiwidXNlcklkIjoidXNyX1l0Y2pEZkRiUFdNOTVCIiwiY2xpZW50SWQiOiJjbGlfV2QwMFBaRV94WXJtYzAiLCJjcm0iOnsiY29tcGFueUlkIjoiMTEwNDM4NTY5NyIsImNvbnRhY3RJZCI6bnVsbCwib3Bwb3J0dW5pdHlJZCI6bnVsbH0sImlzcyI6Imh5cGVybGluZSIsImlhdCI6MTc1OTQ4NTQwNCwiZXhwIjoxNzU5NDg5MDA0fQ._3A1yN8cL49GXp3iyOPq5x4iS6xzZcID0G8OMIiT-Uw"
                    },
                    {
                        "type": "OPEN_URL_IN_IFRAME",
                        "label": "Create quote update",
                        "url": "https://app.hyperline.co/app/quoting/quotes/subscription-update/cus_vxsb6nzZ47TcYw/sub_4WqLzIIpC91DW9?sidebar=false&embedded=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwIiwidXNlcklkIjoidXNyX1l0Y2pEZkRiUFdNOTVCIiwiY2xpZW50SWQiOiJjbGlfV2QwMFBaRV94WXJtYzAiLCJjcm0iOnsiY29tcGFueUlkIjoiMTEwNDM4NTY5NyIsImNvbnRhY3RJZCI6bnVsbCwib3Bwb3J0dW5pdHlJZCI6bnVsbH0sImlzcyI6Imh5cGVybGluZSIsImlhdCI6MTc1OTQ4NTQwNCwiZXhwIjoxNzU5NDg5MDA0fQ._3A1yN8cL49GXp3iyOPq5x4iS6xzZcID0G8OMIiT-Uw"
                    },
                    {
                        "type": "OPEN_URL_IN_IFRAME",
                        "label": "View last invoice",
                        "url": "https://app.hyperline.co/app/invoices/inv_oKXHtXh73jiArv?sidebar=false&embedded=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwIiwidXNlcklkIjoidXNyX1l0Y2pEZkRiUFdNOTVCIiwiY2xpZW50SWQiOiJjbGlfV2QwMFBaRV94WXJtYzAiLCJjcm0iOnsiY29tcGFueUlkIjoiMTEwNDM4NTY5NyIsImNvbnRhY3RJZCI6bnVsbCwib3Bwb3J0dW5pdHlJZCI6bnVsbH0sImlzcyI6Imh5cGVybGluZSIsImlhdCI6MTc1OTQ4NTQwNCwiZXhwIjoxNzU5NDg5MDA0fQ._3A1yN8cL49GXp3iyOPq5x4iS6xzZcID0G8OMIiT-Uw"
                    }
                ]
            },
            {
                "title": "Subscription (Pinpoint Enterprise Plan)",
                "link": "https://dashboard.stripe.com/subscriptions/Canaccord Isle of Man",
                "contents": [
                    {
                        "type": "status",
                        "label": "Status",
                        "value": "Cancelled",
                        "color": "DEFAULT"
                    },
                    {
                        "type": "text",
                        "label": "Pinpoint Enterprise Plan",
                        "value": " 8\u202f000,00 £GB / year"
                    },
                    {
                        "type": "text",
                        "label": "Duration",
                        "value": "23 Jan 2023 - 25 Jan 2024"
                    }
                ],
                "actions": [
                    {
                        "type": "OPEN_URL_IN_IFRAME",
                        "label": "Create quote update",
                        "url": "https://app.hyperline.co/app/quoting/quotes/subscription-update/cus_vxsb6nzZ47TcYw/sub_z2A7sqrfDGByeZ?sidebar=false&embedded=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBwIiwidXNlcklkIjoidXNyX1l0Y2pEZkRiUFdNOTVCIiwiY2xpZW50SWQiOiJjbGlfV2QwMFBaRV94WXJtYzAiLCJjcm0iOnsiY29tcGFueUlkIjoiMTEwNDM4NTY5NyIsImNvbnRhY3RJZCI6bnVsbCwib3Bwb3J0dW5pdHlJZCI6bnVsbH0sImlzcyI6Imh5cGVybGluZSIsImlhdCI6MTc1OTQ4NTQwNCwiZXhwIjoxNzU5NDg5MDA0fQ._3A1yN8cL49GXp3iyOPq5x4iS6xzZcID0G8OMIiT-Uw"
                    }
                ]
            }
        ]
    }
});
  } catch (error: unknown) {
    console.log(JSON.stringify(error));
    return res.status(500).json({
      message:
        "An error occurred when fetching the request id or sending post request.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
